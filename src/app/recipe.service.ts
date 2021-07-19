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

  getRecipeCopyById(id: string) {
    const index = this.recipes.findIndex(r => r.id == id);

    const copy: Recipe = {
      ...this.recipes[index],
      parameterizedIngredients: this.recipes[index].parameterizedIngredients.map(pi => ({
        ...pi,
      })),
    };

    return copy;
  }

  addRecipe(recipe: Recipe): Recipe {
    recipe = {
      ...recipe,
      id: nanoid(),
    };

    this._recipes.push(recipe);
    return recipe;
  }

  updateRecipe(recipe: Recipe) {
    const index = this.recipes.findIndex(r => r.id == recipe.id);

    if (index == -1) {
      throw Error(`Recipe with id ${recipe.id} does not exist.`);
    }

    this.recipes[index] = recipe;
  }
}
