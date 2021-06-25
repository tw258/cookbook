import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.service';
import { nanoid } from 'nanoid';

export enum Difficulty {
  Easy = 'Einfach',
  Medium = 'Mittel',
  Hard = 'Schwer',
}

export enum Measurement {
  g,
  kg,
  ml,
  l,
  TL,
  SL,
  Prise,
  stck,
}

export interface Recipe {
  id?: string;
  title: string;
  note: string;
  parameterizedIngredients: {
    amount: number;
    measurement?: Measurement;
    ingredient: string;
  }[];
  difficulty?: Difficulty;
  preparationTimeInMinutes: number;
  //TODO: pics
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipes: Recipe[] = [
    {
      id: nanoid(),
      title: 'Spaghetti Bolognese',
      note: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum...',
      preparationTimeInMinutes: 20,
      difficulty: Difficulty.Easy,
      parameterizedIngredients: [
        {
          amount: 1,
          ingredient: 'Eier',
          measurement: Measurement.stck,
        },
      ],
    },
    {
      id: nanoid(),
      title: 'Spaghetti Bolognese',
      note: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum...',
      preparationTimeInMinutes: 20,
      difficulty: Difficulty.Easy,
      parameterizedIngredients: [
        {
          amount: 1,
          ingredient: 'Eier',
          measurement: Measurement.stck,
        },
      ],
    },
  ];

  get recipes() {
    return this._recipes;
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push({
      ...recipe,
      id: nanoid(),
    });
  }
}
