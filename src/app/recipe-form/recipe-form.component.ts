import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Measurement, ParameterizedIngredient, Recipe, RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent {
  recipe: Recipe = {
    note: '',
    parameterizedIngredients: [],
    preparationTimeInMinutes: 0,
    title: '',
  };

  currentParameterizedIngredient: ParameterizedIngredient = this.createParameterizedIngredient();

  constructor(private recipeservice: RecipeService, private router: Router) {}

  handleAddIngredient() {
    this.recipe.parameterizedIngredients.push(this.currentParameterizedIngredient);

    // Reset input forms
    this.currentParameterizedIngredient = this.createParameterizedIngredient();
  }

  handleSave() {
    this.recipeservice.addRecipe(this.recipe);
    this.router.navigate(['']);
  }

  private createParameterizedIngredient(): ParameterizedIngredient {
    return {
      amount: 1,
      ingredient: '',
      measurement: Measurement.Stck,
    };
  }
}
