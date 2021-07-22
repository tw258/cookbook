import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dummyRecipes } from './dummies';
import { Recipe } from './models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    const url = environment.apiUrl + '/recipes';
    return this.http.get<Recipe[]>(url);
  }

  getRecipeById(id: string): Observable<Recipe> {
    const url = `${environment.apiUrl}/recipes/${id}`;
    return this.http.get<Recipe>(url);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    const url = `${environment.apiUrl}/recipes`;
    return this.http.post<Recipe>(url, recipe);
  }

  updateRecipeById(id: string, recipe: Recipe): Observable<Recipe> {
    const url = `${environment.apiUrl}/recipes/${id}`;
    return this.http.put<Recipe>(url, recipe);
  }

  deleteRecipeById(id: string): Observable<void> {
    const url = `${environment.apiUrl}/recipes/${id}`;
    return this.http.delete<void>(url);
  }
}
