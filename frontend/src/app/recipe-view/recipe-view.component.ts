import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { LoginService } from '../login.service';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css'],
})
export class RecipeViewComponent {
  recipe$: Observable<Recipe> = this.recipeService
    .getRecipeById(this.route.snapshot.params.id)
    .pipe(tap(() => (this.isLoading = false)));

  isLoading = true;
  isAuthenticated = this.login.checkIfCredentialsStored();

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private login: LoginService,
  ) {}
}
