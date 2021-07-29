import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dummyRecipes } from './dummies';
import { Recipe } from './models/Recipe';
import { nanoid } from 'nanoid';

@Injectable()
export class HttpProxyInterceptor implements HttpInterceptor {
  private recipes: Recipe[] = dummyRecipes;

  //component -> service -> interceptor1 -> interceptor2 -> Browser -> HTTP Server
  intercept(request: HttpRequest<any>, next: any): Observable<HttpResponse<any>> {
    return next.handle(request);

    if (environment.production) {
      return next.handle(request);
    } else {
      //mock
      switch (request.method) {
        case 'GET':
          return this.handleGet(request);
        case 'POST':
          return this.handlePost(request);
        case 'PUT':
          return this.handlePut(request);
        case 'DELETE':
          return this.handleDelete(request);
        default:
          console.log('HTTP Method not supported');
          return of();
      }
    }
  }

  private handleGet(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    if (request.url.includes('recipes/')) {
      //GetRecipeById
      const id = this.getIdFromUrl(request.url);
      const index = this.recipes.findIndex(r => r.id == id);
      const copy: Recipe = {
        ...this.recipes[index],
        imagesAsBase64: this.recipes[index].imagesAsBase64.map(i => i),
        parameterizedIngredients: this.recipes[index].parameterizedIngredients.map(pi => ({
          ...pi,
        })),
      };

      return of(
        new HttpResponse({
          body: copy,
          status: 200,
        }),
      );
    } else {
      //GetRecipes
      return of(
        new HttpResponse({
          body: this.recipes,
          status: 200,
        }),
      );
    }
  }

  private handlePost(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    let recipe: Recipe = request.body;
    recipe = {
      ...recipe,
      id: nanoid(),
    };

    this.recipes.push(recipe);
    return of(
      new HttpResponse({
        body: recipe,
        status: 200,
      }),
    );
  }

  private handlePut(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const id = this.getIdFromUrl(request.url);
    const index = this.recipes.findIndex(r => r.id == id);

    this.recipes[index] = request.body;

    return of(
      new HttpResponse({
        body: request.body,
        status: 200,
      }),
    );
  }

  private handleDelete(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const id = this.getIdFromUrl(request.url);
    const index = this.recipes.findIndex(r => r.id == id);

    this.recipes.splice(index, 1);

    return of(
      new HttpResponse({
        status: 200,
      }),
    );
  }

  private getIdFromUrl(url: string): string {
    return url.split('/').slice(-1)[0];
  }
}
