import { Component, OnInit } from '@angular/core';
import { Difficulty, Measurement, Recipe } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    {
      title: 'Spaghetti Bolognese',
      note: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum...',
      preparationTimeInMinutes: 20,
      difficulty: Difficulty.Easy,
      parameterizedIngredients: [
        {
          amount: 1,
          ingredient: 'Eier',
          measurement: Measurement.Pieces,
        },
      ],
    },
    {
      title: 'Spaghetti Bolognese',
      note: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum...',
      preparationTimeInMinutes: 20,
      difficulty: Difficulty.Easy,
      parameterizedIngredients: [
        {
          amount: 1,
          ingredient: 'Eier',
          measurement: Measurement.Pieces,
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
