import { Injectable } from "@angular/core";
import { nanoid } from "nanoid";

export interface Ingredient {
  id?: string;
  name: string;
  note?: string;
  //TODO: pic
}

@Injectable({
  providedIn: "root",
})
export class IngredientService {
  private ingredients: Ingredient[] = [];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push({
      ...ingredient,
      id: nanoid(),
    });
  }
}
