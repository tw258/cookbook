import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
