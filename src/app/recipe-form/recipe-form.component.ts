import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Measurement, ParameterizedIngredient, Recipe, RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent {
  maxTime = 60;

  recipe: Recipe = {
    note: '',
    portions: 1,
    isFavorite: false,
    parameterizedIngredients: [],
    preparationTimeInMinutes: 0,
    title: '',
    imagesAsBase64: [],
  };

  currentParameterizedIngredient: ParameterizedIngredient = this.createParameterizedIngredient();

  constructor(private recipeservice: RecipeService, private router: Router) {}

  handleAddIngredient() {
    this.recipe.parameterizedIngredients.push(this.currentParameterizedIngredient);

    // Reset input forms
    this.currentParameterizedIngredient = this.createParameterizedIngredient();
  }

  handleRemoveIngredient(ingredientToDelete: ParameterizedIngredient) {
    const indexToDelete = this.recipe.parameterizedIngredients.indexOf(ingredientToDelete, 0);
    if (indexToDelete > -1) {
      this.recipe.parameterizedIngredients.splice(indexToDelete, 1);
    }
  }

  handleSave() {
    this.recipeservice.addRecipe(this.recipe);
    this.router.navigate(['']);
  }

  handleImageAdd(imagesAsBase64: string) {
    console.log(imagesAsBase64);
    this.recipe.imagesAsBase64.push(imagesAsBase64);
  }

  private createParameterizedIngredient(): ParameterizedIngredient {
    return {
      amount: 1,
      ingredient: '',
      measurement: Measurement.Stck,
    };
  }
}
