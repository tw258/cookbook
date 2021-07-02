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
import { FormsModule } from '@angular/forms';
import { AddImageComponent } from './recipe-form/add-image/add-image.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { IngredientsComponent } from './recipe-view/ingredients/ingredients.component';
import { MultiplyPortionsPipe } from './recipe-view/ingredients/multiply-portions.pipe';
import { ChipComponent } from './recipe-card/chip/chip.component';
import { CommonModule } from '@angular/common';
import { SortFavoritesPipe } from './recipe-list/sort-favorites.pipe';

const routes: Route[] = [
  { path: '', component: RecipeListComponent, pathMatch: 'full' },
  { path: 'new-recipe', component: RecipeFormComponent },
  { path: 'recipes/:id', component: RecipeViewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IngredientFormComponent,
    RecipeListComponent,
    RecipeFormComponent,
    RecipeCardComponent,
    AddImageComponent,
    RecipeViewComponent,
    IngredientsComponent,
    MultiplyPortionsPipe,
    ChipComponent,
    SortFavoritesPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
