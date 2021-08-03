import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];
  filteredRecipes: Recipe[] = [];

  constructor(private recipeservice: RecipeService, private login: LoginService) {}

  handleFilterInput(filterInput: string) {
    this.filteredRecipes = this.recipes.filter(r => r.title.toUpperCase().includes(filterInput));
  }

  ngOnInit(): void {
    this.recipeservice.getRecipes().subscribe(r => {
      this.recipes = r;
      this.filteredRecipes = r;
    });
  }

  handleLogout() {
    this.login.logout();
  }
}
