import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe$: Observable<Recipe> = this.recipeService
    .getRecipeById(this.route.snapshot.params.id)
    .pipe(tap(() => (this.isLoading = false)));

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private localstorageService: LocalStorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.localstorageService.checkIfCredentialsExist()) {
      // Missing credentials indicate an unauthenticated
      // user, so we redirect to the `LoginComponent`.

      this.router.navigate(['/login']);
    }
  }
}
