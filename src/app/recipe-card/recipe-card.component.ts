import { Component, Input, OnInit } from '@angular/core';
import { Difficulty, Measurement, Recipe } from '../recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() marginTop: number = 0;
}
