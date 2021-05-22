import { Injectable } from "@angular/core";
import { Ingredient } from "./ingredient.service";
import { nanoid } from "nanoid";

export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

export enum Measurement {
  Gram,
  Kilogram,
  Milliliter,
  Liter,
  Teaspoon,
  Tablespoon,
  Pinch,
}

export interface Recipe {
  id?: string;
  title: string;
  note: string;
  parameterizedIngredients: {
    amount: number;
    measurement?: Measurement;
    ingredientId: string;
  }[];
  difficulty?: Difficulty;
  preparationTimeInMinutes: number;
  //TODO: pics
}

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private recipes: Recipe[] = [];

  addRecipe(recipe: Recipe) {
    this.recipes.push({
      ...recipe,
      id: nanoid(),
    });
  }
}
