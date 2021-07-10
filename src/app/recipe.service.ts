import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { dummyRecipes } from './dummies';
import { Recipe } from './models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
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
