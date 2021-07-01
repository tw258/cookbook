import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ParameterizedIngredient, Recipe } from 'src/app/recipe.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent {
  _recipe!: Recipe;
  currentPortions!: number;

  @Input() set recipe(recipe: Recipe) {
    this._recipe = recipe;
    this.currentPortions = recipe.portions;
  }

  constructor() {}

  handleAddPortion() {
    this.currentPortions++;
  }

  handleRemovePortion() {
    if (this.currentPortions > 1) {
      this.currentPortions--;
    }
  }

  handleAddToClipboard() {
    // this.clipboard.writeText('test');
  }
}
