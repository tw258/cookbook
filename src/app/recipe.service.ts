import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.service';
import { nanoid } from 'nanoid';

export enum Difficulty {
  Easy = 'Einfach',
  Medium = 'Mittel',
  Hard = 'Schwer',
}

export enum Measurement {
  g = 'g',
  kg = 'kg',
  ml = 'ml',
  l = 'l',
  TL = 'TL',
  EL = 'EL',
  Prise = 'Prise',
  Stck = 'Stck',
}

export interface ParameterizedIngredient {
  amount: number;
  measurement?: Measurement;
  ingredient: string;
}

export interface Recipe {
  id?: string;
  title: string;
  note: string;
  imagesAsBase64: string[];
  parameterizedIngredients: ParameterizedIngredient[];
  difficulty?: Difficulty;
  preparationTimeInMinutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipes: Recipe[] = [
    {
      id: '1',
      title: 'Spaghetti Bolognese',
      note: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum...',
      preparationTimeInMinutes: 20,
      difficulty: Difficulty.Easy,
      imagesAsBase64: [],
      parameterizedIngredients: [
        {
          amount: 1,
          ingredient: 'Eier',
          measurement: Measurement.Stck,
        },
      ],
    },
    {
      id: '2',
      title: 'Pizza',
      note: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum...',
      preparationTimeInMinutes: 40,
      imagesAsBase64: [],
      difficulty: Difficulty.Medium,
      parameterizedIngredients: [
        {
          amount: 1,
          ingredient: 'Eier',
          measurement: Measurement.Stck,
        },
        {
          amount: 2,
          ingredient: 'Mehl',
          measurement: Measurement.kg,
        },
      ],
    },
  ];

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
