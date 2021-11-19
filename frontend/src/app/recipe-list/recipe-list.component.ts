import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RecipeService } from '../recipe.service';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Recipe } from '../models/recipe';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  version = `v${environment.version}`;

  user?: User;
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  constructor(
    private recipeservice: RecipeService,
    private userService: UserService,
    private localStorage: LocalStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService
      .getUser()
      .pipe(
        tap(user => (this.user = user)),
        switchMap(user => this.recipeservice.getRecipesByUser(user)),
      )
      .subscribe(recipes => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
      });
  }

  handleFilterInput(filterInput: string) {
    this.filteredRecipes = this.recipes.filter(r => r.title.toUpperCase().includes(filterInput));
  }

  handleLogoutClick() {
    this.localStorage.clearAuthToken();
    this.userService.deleteUser();
    this.router.navigateByUrl('/login');
  }
}
