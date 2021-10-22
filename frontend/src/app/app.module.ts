import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { FormsModule } from '@angular/forms';
import { AddImageComponent } from './recipe-form/add-image/add-image.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { IngredientCalculatorComponent } from './recipe-details/ingredient-calculator/ingredient-calculator.component';
import { MultiplyPortionsPipe } from './recipe-details/ingredient-calculator/multiply-portions.pipe';
import { CommonModule } from '@angular/common';
import { RecipeFilterComponent } from './recipe-list/recipe-filter/recipe-filter.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpProxyInterceptor } from './http-proxy.interceptor';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { ImageSliderComponent } from './recipe-details/image-slider/image-slider.component';

const routes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'new-recipe', component: RecipeFormComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: 'recipes/:id/edit', component: RecipeFormComponent },
];

@NgModule({
  declarations: [
    //Eigene Komponenten, Pipes, Directives
    AppComponent,
    RecipeListComponent,
    RecipeFormComponent,
    RecipeCardComponent,
    AddImageComponent,
    RecipeDetailsComponent,
    IngredientCalculatorComponent,
    MultiplyPortionsPipe,
    RecipeFilterComponent,
    LoginComponent,
    ImageSliderComponent,
  ],
  imports: [
    //eigene und Angular Module
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpProxyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
