import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectionList } from '@angular/material/list/public-api';
import { Recipe } from 'src/app/models/Recipe';
import { ParameterizedIngredient } from 'src/app/models/ParamterizedIngredient';

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

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  handleAddPortion() {
    this.currentPortions++;
  }

  handleRemovePortion() {
    if (this.currentPortions > 1) {
      this.currentPortions--;
    }
  }

  handleAddToClipboard(selectionList: MatSelectionList) {
    const values: ParameterizedIngredient[] = selectionList.selectedOptions.selected.map(
      o => o.value,
    );
    const stringToCopy = values.reduce(
      (acc, curr) =>
        (acc += `${curr.amount * this.currentPortions} ${curr.measurement} ${curr.ingredient}\n`),
      '',
    );
    if (values.length == 0) {
      this.snackBar.open('Keine Zutaten ausgewählt', 'OK', { duration: 2000 });
    } else {
      this.clipboard.copy(stringToCopy);
      this.snackBar.open('Ausgewählte Zutaten kopiert', 'OK', { duration: 2000 });
    }
  }
}
