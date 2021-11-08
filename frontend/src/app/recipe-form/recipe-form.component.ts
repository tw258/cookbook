import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ImageService } from '../image.service';
import { Image } from '../models/image';
import { Measurement } from '../models/measurement';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe.service';
import { UserService } from '../user.service';
import { switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmRecipeDeleteDialogComponent } from './confirm-recipe-delete-dialog/confirm-recipe-delete-dialog.component';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  isLoading = false;
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
    private userService: UserService,
    private imageService: ImageService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');

    if (recipeId) {
      // A recipe id was passed through the URL which
      // means we're editing an existing recipe.
      this.isEditMode = true;
      this.recipeservice
        .getRecipeById(recipeId)
        .pipe(
          tap(recipe => (this.recipe = recipe)),
          switchMap(recipe => this.imageService.getImagesById(recipe.imageIds)),
        )
        .subscribe(images => (this.imagesToDisplay = images));
    } else {
      // We are creating a new recipe so we fill it with dummy data.
      this.recipe = {
        _id: '',
        userId: '',
        note: '',
        portions: 2,
        ingredients: [],
        preparationTimeInMinutes: 0,
        dateCreatedAsISOString: '',
        title: '',
        thumbnailAsBase64: '',
        imageIds: [],
      };
    }
  }

  handleSaveClick() {
    this.isLoading = true;
    let recipe$: Observable<Recipe>;

    if (this.isEditMode) {
      this.recipe.dateUpdatedAsISOString = new Date().toISOString();
      recipe$ = this.recipeservice.updateRecipeById(this.recipe._id, this.recipe);
    } else {
      this.recipe.dateCreatedAsISOString = new Date().toISOString();
      recipe$ = this.userService
        .getUser()
        .pipe(
          switchMap(user => this.recipeservice.addRecipe({ ...this.recipe, userId: user._id })),
        );
    }

    recipe$.subscribe(recipe =>
      this.persistImages(recipe).subscribe({
        complete: () => {
          this.router.navigateByUrl(`/recipes/${recipe._id}`);
          this.isLoading = false;
        },
      }),
    );
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
    this.matDialog.open(ConfirmRecipeDeleteDialogComponent, {
      data: {
        recipeTitle: this.recipe.title,
        onConfirm: () =>
          this.recipeservice
            .deleteRecipeBdyId(this.recipe._id!)
            .subscribe(() => this.router.navigateByUrl('/recipes')),
        onCancel: () => {
          // We ignore the cancel.
        },
      },
    });
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
    } else {
      this.recipe.thumbnailAsBase64 = this.imagesToDisplay[0].dataAsBase64;
    }
  }

  private createIngredient(): Ingredient {
    return {
      amount: 1,
      name: '',
      measurement: Measurement.Stk,
    };
  }
}
