import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/recipe.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar, //TODO: So richtig?
  ) {}

  handleAddPortion() {
    this.currentPortions++;
  }

  handleRemovePortion() {
    if (this.currentPortions > 1) {
      this.currentPortions--;
    }
  }

  handleAddToClipboard() {
    //TODO: Add logic, that only selected items are copied
    let stringToCopy: string = '';
    for (const currIngredient of this._recipe.parameterizedIngredients) {
      stringToCopy =
        stringToCopy +
        currIngredient.amount +
        ' ' +
        currIngredient.measurement +
        ' ' +
        currIngredient.ingredient +
        '\n';
    }
    this.clipboard.copy(stringToCopy);
    this.snackBar.open('Ausgewählte Zutaten kopiert', 'OK', { duration: 2000 });
  }
}
