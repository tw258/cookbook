import { Component, Input, OnInit } from '@angular/core';
import { ParameterizedIngredient } from 'src/app/recipe.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent implements OnInit {
  @Input() parameterizedIngredients!: ParameterizedIngredient[];
  portions: number = 1;
  constructor() {}

  ngOnInit(): void {}

  handleAddPortion() {
    this.portions++;
    this.CalculatePortions();
  }

  handleRemovePortion() {
    this.portions--;
    this.CalculatePortions();
  }

  CalculatePortions() {
    console.log(this.portions);
    this.parameterizedIngredients.forEach(i => (i.amount = i.amount * this.portions));
  }
}
