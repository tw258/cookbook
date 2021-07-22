import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { dummyRecipes } from './dummies';
import { Recipe } from './models/Recipe';

@Injectable()
export class HttpProxyInterceptor implements HttpInterceptor {
  private recipes: Recipe[] = dummyRecipes;

  //component -> service -> interceptor1 -> interceptor2 -> Browser -> HTTP Server
  intercept(request: HttpRequest<any>, next: any): Observable<HttpResponse<any>> {
    if (environment.production) {
      return next.handle(request);
    } else {
      //implement mock
      console.log(request);

      switch (request.method) {
        case 'GET':
          const handleGet$ = this.handleGet(request);
          return handleGet$;
          break;
        case 'POST':
          // addRecipe(recipe: Recipe): Recipe {
          //   recipe = {
          //     ...recipe,
          //     id: nanoid(),
          //   };
          break;
        case 'PUT':
          //   this._recipes.push(recipe);
          //   return recipe;
          // }

          // updateRecipe(recipe: Recipe) {
          //   const index = this.recipes.findIndex(r => r.id == recipe.id);

          //   if (index == -1) {
          //     throw Error(`Recipe with id ${recipe.id} does not exist.`);
          //   }

          //   this.recipes[index] = recipe;
          // }
          break;
        case 'DELETE':
          //..
          break;
        default:
          console.log('HTTP Method not supported');
      }

      return new Observable();
    }
  }

  handleGet(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    //GetRecipeById
    if (request.url.includes('recipes/')) {
      const id = request.url.split('/').slice(-1)[0];
      console.log(id);

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
      return of(
        new HttpResponse({
          body: this.recipes,
          status: 200,
        }),
      );
    }
  }
}
