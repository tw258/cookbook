import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RecipeService } from '../recipe.service';
import { switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  user!: User;
  recipes!: Recipe[];
  filteredRecipes: Recipe[] = [];

  constructor(
    private recipeservice: RecipeService,
    private userService: UserService,
    private router: Router,
    private localstorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    if (!this.localstorageService.checkIfCredentialsExist()) {
      // Missing credentials indicate an unauthenticated
      // user, so we redirect to the `LoginComponent`.

      this.router.navigateByUrl('/login');
    }

    this.userService.user$
      .pipe(
        tap(user => (this.user = user)),
        switchMap(user => this.recipeservice.getRecipesByUserId(user._id)),
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
    this.userService.logout();
  }
}
