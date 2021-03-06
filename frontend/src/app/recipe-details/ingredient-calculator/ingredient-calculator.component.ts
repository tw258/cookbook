import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectionList } from '@angular/material/list/public-api';
import { Recipe } from 'src/app/models/recipe';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-ingredient-calculator',
  templateUrl: './ingredient-calculator.component.html',
  styleUrls: ['./ingredient-calculator.component.css'],
})
export class IngredientCalculatorComponent {
  _recipe!: Recipe;
  currentPortions!: number;

  @Input() set recipe(recipe: Recipe) {
    this._recipe = recipe;
    this.currentPortions = recipe.portions || 1;
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
    const values: Ingredient[] = selectionList.selectedOptions.selected.map(o => o.value);

    const stringToCopy = values.reduce(
      (acc, curr) =>
        (acc += `- ${(curr.amount / (this._recipe.portions || 1)) * this.currentPortions} ${
          curr.measurement
        } ${curr.name}\n`),
      `Einkaufsliste für "${this._recipe.title}" (${this.currentPortions} Pers.):\n\n`,
    );

    if (values.length == 0) {
      this.snackBar.open('Keine Zutaten ausgewählt', 'OK', { duration: 2000 });
    } else {
      this.clipboard.copy(stringToCopy);
      this.snackBar.open(`${values.length} ausgewählte Zutaten kopiert`, 'OK', { duration: 2000 });
    }
  }
}
