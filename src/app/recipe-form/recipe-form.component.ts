import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Measurement, ParameterizedIngredient } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  parameterizedIngredients: ParameterizedIngredient[] = [];

  constructor() {}

  ngOnInit(): void {}

  handleAddIngredient(amount: any, measurement: Measurement, name: string) {
    const parameterizedIngredient: ParameterizedIngredient = {
      amount,
      measurement,
      ingredient: name,
    };

    this.parameterizedIngredients.push(parameterizedIngredient);
  }
}
