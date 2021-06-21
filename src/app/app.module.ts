import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

const routes: Route[] = [
  { path: '', component: RecipeListComponent, pathMatch: 'full' },
  { path: 'new-recipe', component: RecipeFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IngredientFormComponent,
    RecipeListComponent,
    RecipeFormComponent,
    RecipeCardComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
