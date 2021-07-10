import { Component, Input } from '@angular/core';
import { Recipe } from '../models/Recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() marginTop: number = 0;

  handleFavorite() {
    this.recipe.isFavorite = !this.recipe.isFavorite;
  }
}
