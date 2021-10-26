import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from './models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipesByUserId(userId: string): Observable<Recipe[]> {
    const url = `${environment.apiUrl}/recipes?userId=${userId}`;
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
