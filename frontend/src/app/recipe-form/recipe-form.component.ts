import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
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
import { ImageClickDialogComponent } from './image-click-dialog/image-click-dialog.component';

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

  private initialThumbnailId = '';
  private currentThumbnailId = '';

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
      this.isLoading = true;
      this.recipeservice
        .getRecipeById(recipeId)
        .pipe(
          tap(recipe => (this.recipe = recipe)),
          switchMap(recipe => this.imageService.getImagesById(recipe.imageIds)),
        )
        .subscribe({
          next: images => {
            this.imagesToDisplay = images;
            this.initialThumbnailId = this.imagesToDisplay.find(i => i.isThumbnail)?._id || '';
            this.currentThumbnailId = this.initialThumbnailId;
          },
          complete: () => (this.isLoading = false),
        });
    } else {
      // We are creating a new recipe so
      // we fill a new one with dummy data.
      this.recipe = {
        _id: '',
        userId: '',
        note: '',
        isPublic: true,
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

  /**
   * Saves the newly created or updated
   * recipe with all its dependencies.
   * This is the most important method in this component.
   */
  onSave() {
    this.isLoading = true;

    const user$ = this.userService.getUser();
    let recipe$: Observable<Recipe>;

    if (this.isEditMode) {
      this.recipe.dateUpdatedAsISOString = new Date().toISOString();
      recipe$ = this.recipeservice.updateRecipeById(this.recipe._id, this.recipe);
    } else {
      this.recipe.dateCreatedAsISOString = new Date().toISOString();
      recipe$ = user$.pipe(
        switchMap(({ _id: userId }) => this.recipeservice.addRecipe({ ...this.recipe, userId })),
      );
    }

    let recipeIdToRedirect = '';
    recipe$
      .pipe(
        tap(({ _id }) => (recipeIdToRedirect = _id)),
        switchMap(recipe => this.persistImages(recipe)),
        switchMap(() => this.updateThumbnail()),
      )
      .subscribe({
        complete: () => {
          this.isLoading = false;
          this.router.navigateByUrl(`/recipes/${recipeIdToRedirect}`);
        },
      });
  }

  private persistImages(recipe: Recipe) {
    const responses: Observable<any>[] = [];

    if (this.imagesToAdd.length) {
      const imagesToAdd$ = this.imageService.addImages(this.imagesToAdd, recipe);
      responses.push(imagesToAdd$);
    }

    if (this.imagesToDelete.length) {
      const imagesToDelete$ = this.imageService.deleteImages(this.imagesToDelete, recipe);
      responses.push(imagesToDelete$);
    }

    if (!responses.length) {
      return of(null);
    }

    return forkJoin(responses);
  }

  private updateThumbnail(): Observable<any> {
    if (!this.isEditMode) {
      return EMPTY;
    }

    if (!this.initialThumbnailId) {
      // We're editing an existing recipe without any images.
      // We can proceed as if we weren't in edit mode.

      return EMPTY;
    }

    if (this.initialThumbnailId == this.currentThumbnailId) {
      return EMPTY;
    }

    if (!this.currentThumbnailId) {
      // New image was added and made thumbnail.
      // We just need to remove the flag from the previous one.
      // The new one already has the flag set to `true`.

      return this.imageService.setThumbnail(this.initialThumbnailId, false);
    }

    // We remove the flag the previous
    // image and add it to the current one.
    return forkJoin([
      this.imageService.setThumbnail(this.initialThumbnailId, false),
      this.imageService.setThumbnail(this.currentThumbnailId, true),
    ]);
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
      image.isThumbnail = true;
      this.recipe.thumbnailAsBase64 = image.dataAsBase64;
    }
  }

  onImageClick(image: Image) {
    this.matDialog.open(ImageClickDialogComponent, {
      data: {
        isThumbnail: image.isThumbnail,
        size: image.sizeInBytes,
        onDelete: () => {
          if (image._id) {
            // The image has an `_id` and therefore exists in the database.
            // We have to mark it for deletion to delete it later.
            this.imagesToDelete.push(image);
          } else {
            // We do nothing here.
            // This image only exists in our local state and doesn't need
            // to be deleted from the datatbase.
          }

          let indexOfImage = this.imagesToDisplay.indexOf(image);
          this.imagesToDisplay.splice(indexOfImage, 1);

          indexOfImage = this.imagesToAdd.indexOf(image);
          this.imagesToAdd.splice(indexOfImage, 1);

          if (image.isThumbnail && this.imagesToDisplay.length > 0) {
            // The image was the thumbnail and there are images left.
            // So we make the image at position 0 the new thumnail.

            this.imagesToDisplay[0].isThumbnail = true;
            this.recipe.thumbnailAsBase64 = this.imagesToDisplay[0].dataAsBase64;
            this.currentThumbnailId = this.imagesToDisplay[0]._id;
          }
        },
        onMakeThumbnail: () => {
          const prevThumbnail = this.imagesToDisplay.find(i => i.isThumbnail);
          if (prevThumbnail) {
            prevThumbnail.isThumbnail = false;
          }

          image.isThumbnail = true;
          this.recipe.thumbnailAsBase64 = image.dataAsBase64;
          this.currentThumbnailId = image._id;
        },
      },
    });
  }

  private createIngredient(): Ingredient {
    return {
      amount: 1,
      name: '',
      measurement: Measurement.Stk,
    };
  }
}
