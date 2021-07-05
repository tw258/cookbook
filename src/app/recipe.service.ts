import { Injectable, OnInit } from '@angular/core';
import { Ingredient } from './ingredient.service';
import { nanoid } from 'nanoid';
import { dummyRecipes } from './dummies';
import { Difficulty } from './models/difficulty';
import { Measurement } from './models/measurement';

export interface ParameterizedIngredient {
  amount: number;
  measurement?: Measurement;
  ingredient: string;
}

export interface Recipe {
  id?: string;
  title: string;
  author?: string;
  note: string;
  imagesAsBase64: string[];
  isFavorite: boolean;
  portions: number;
  parameterizedIngredients: ParameterizedIngredient[];
  creationDateAsIsoString?: string;
  difficulty?: Difficulty;
  preparationTimeInMinutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // ngOnInit(): void {
  //   this._recipes = dummyRecipes;
  // }
  private _recipes: Recipe[] = dummyRecipes;

  get recipes() {
    return this._recipes;
  }

  getRecipeById(id: string) {
    const index = this.recipes.findIndex(r => r.id == id);
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push({
      ...recipe,
      id: nanoid(),
    });
  }
}
