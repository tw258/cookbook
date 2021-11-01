import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ImageService } from '../image.service';
import { Image } from '../models/image';
import { Measurement } from '../models/measurement';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipe!: Recipe;
  maxTime = 60;
  isEditMode = false;
  currentIngredient: Ingredient = this.createIngredient();

  imagesToDisplay: Image[] = [];
  imagesToAdd: Image[] = [];
  imagesToDelete: Image[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeservice: RecipeService,
    private router: Router,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');

    if (recipeId) {
      // A recipe id was passed through the URL which
      // means we're editing an existing recipe.
      this.isEditMode = true;
      this.recipeservice.getRecipeById(recipeId).subscribe(recipe => (this.recipe = recipe));
    } else {
      // We are creating a new recipe so we fill it with dummy data.
      this.recipe = {
        _id: '',
        userId: '',
        note: '',
        portions: 2,
        ingredients: [],
        preparationTimeInMinutes: 0,
        title: '',
        thumbnailAsBase64: '',
        imageIds: [],
      };
    }
  }

  handleSaveClick() {
    let recipe$: Observable<Recipe>;

    if (this.isEditMode) {
      recipe$ = this.recipeservice.updateRecipeById(this.recipe._id, this.recipe);
    } else {
      recipe$ = this.recipeservice.addRecipe(this.recipe);
    }

    recipe$.subscribe(recipe => {
      this.persistImages(recipe).subscribe(() =>
        this.router.navigateByUrl(`/recipes/${recipe._id}`),
      );
    });
  }

  private persistImages(recipe: Recipe) {
    const respones$: Observable<any>[] = [];

    if (this.imagesToAdd.length) {
      const imagesToAdd$ = this.imageService.addImages(this.imagesToAdd, recipe);
      respones$.push(imagesToAdd$);
    }

    if (this.imagesToDelete.length) {
      const imagesToDelete$ = this.imageService.deleteImages(this.imagesToDelete, recipe);
      respones$.push(imagesToDelete$);
    }

    return forkJoin(respones$);
  }

  handleDeleteClick() {
    this.recipeservice
      .deleteRecipeBdyId(this.recipe._id!)
      .subscribe(() => this.router.navigateByUrl('/recipes'));
  }

  handleAddIngredientClick() {
    const { amount, name, measurement } = this.currentIngredient;

    if (amount && name && measurement) {
      this.recipe.ingredients.push(this.currentIngredient);

      // Reset ingredient form.
      this.currentIngredient = this.createIngredient();
    }
  }

  handleRemoveIngredientClick(ingredientToDelete: Ingredient) {
    const indexToDelete = this.recipe.ingredients.indexOf(ingredientToDelete, 0);
    if (indexToDelete > -1) {
      this.recipe.ingredients.splice(indexToDelete, 1);
    }
  }

  handlePreparationTimeChange(newPreparationTime: number | null): void {
    if (newPreparationTime) {
      this.recipe.preparationTimeInMinutes = newPreparationTime;
    }
  }

  handleCancelClick() {
    if (this.isEditMode) {
      this.router.navigateByUrl(`/recipes/${this.recipe._id}`);
    } else {
      this.router.navigateByUrl('/recipes');
    }
  }

  handleImageAdded(image: Image) {
    this.imagesToAdd.push(image);
    this.imagesToDisplay.push(image);

    if (this.imagesToDisplay.length === 1) {
      // The image that was just added, is the recipe's
      // first image, so we set it as the recipe's thumbnail.
      this.recipe.thumbnailAsBase64 = image.dataAsBase64;
    }
  }

  handleImageRemoveClick(image: Image) {
    const indexOfImage = this.imagesToDisplay.indexOf(image);

    if (image._id) {
      // The image has an `_id` and therefore exists in the database.
      // We have to mark it for deletion to delete it later.
      this.imagesToDelete.push(image);
    } else {
      // We do nothing here.
      // This image only exists in our local state and doesn't need
      // to be deleted from the datatbase.
    }

    this.imagesToDisplay.splice(indexOfImage, 1);

    if (this.imagesToDisplay.length === 0) {
      // The last image was removed, so we also reset the recipe's thumbnail.
      this.recipe.thumbnailAsBase64 = '';
    }
  }

  private createIngredient(): Ingredient {
    return {
      amount: 1,
      name: '',
      measurement: Measurement.Stck,
    };
  }
}
