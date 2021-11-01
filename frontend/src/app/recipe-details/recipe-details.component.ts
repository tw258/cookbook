import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent {
  recipe$: Observable<Recipe> = this.recipeService.getRecipeById(this.route.snapshot.params.id);

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}
}
