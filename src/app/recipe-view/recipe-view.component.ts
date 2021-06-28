import { Component, OnInit, Input } from '@angular/core';
import { nanoid } from 'nanoid';
import { Difficulty, Measurement, Recipe } from '../recipe.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css'],
})
export class RecipeViewComponent implements OnInit {
  @Input() recipe: Recipe = {
    id: nanoid(),
    title: 'Spaghetti Bolognese',
    note: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum...',
    preparationTimeInMinutes: 20,
    difficulty: Difficulty.Easy,
    parameterizedIngredients: [
      {
        amount: 1,
        ingredient: 'Eier',
        measurement: Measurement.Stck,
      },
      {
        amount: 2,
        ingredient: 'Milch',
        measurement: Measurement.l,
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
