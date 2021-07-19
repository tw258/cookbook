import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Measurement } from '../models/measurement';
import { ParameterizedIngredient } from '../models/ParamterizedIngredient';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  maxTime = 60;

  isEditMode = false;

  recipe: Recipe = {
    note: '',
    portions: 1,
    isFavorite: false,
    parameterizedIngredients: [],
    preparationTimeInMinutes: 0,
    title: '',
    imagesAsBase64: [],
  };

  currentParameterizedIngredient: ParameterizedIngredient = this.createParameterizedIngredient();

  constructor(
    private route: ActivatedRoute,
    private recipeservice: RecipeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.recipe = this.recipeservice.getRecipeCopyById(id);
      this.isEditMode = true;
    }
  }

  handleAddIngredient() {
    this.recipe.parameterizedIngredients.push(this.currentParameterizedIngredient);

    // Reset input forms
    this.currentParameterizedIngredient = this.createParameterizedIngredient();
  }

  handleRemoveIngredient(ingredientToDelete: ParameterizedIngredient) {
    const indexToDelete = this.recipe.parameterizedIngredients.indexOf(ingredientToDelete, 0);
    if (indexToDelete > -1) {
      this.recipe.parameterizedIngredients.splice(indexToDelete, 1);
    }
  }

  handleSave() {
    if (this.isEditMode) {
      this.recipeservice.updateRecipe(this.recipe);
      this.router.navigate(['/recipes', this.recipe.id]);
    } else {
      const id = this.recipeservice.addRecipe(this.recipe).id;
      this.router.navigate(['/recipes', id]);
    }
  }

  handleImageAdd(base64string: string) {
    this.recipe.imagesAsBase64.push(base64string);
  }

  private createParameterizedIngredient(): ParameterizedIngredient {
    return {
      amount: 1,
      ingredient: '',
      measurement: Measurement.Stck,
    };
  }
}
