import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { AddImageComponent } from './recipe-form/add-image/add-image.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { IngredientCalculatorComponent } from './recipe-details/ingredient-calculator/ingredient-calculator.component';
import { MultiplyPortionsPipe } from './recipe-details/ingredient-calculator/multiply-portions.pipe';
import { RecipeFilterComponent } from './recipe-list/recipe-filter/recipe-filter.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { ImageSliderComponent } from './recipe-details/image-slider/image-slider.component';
import { AuthGuard } from './auth.guard';

const routes: Route[] = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recipes', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'new-recipe', component: RecipeFormComponent, canActivate: [AuthGuard] },
  { path: 'recipes/:id', component: RecipeDetailsComponent, canActivate: [AuthGuard] },
  { path: 'recipes/:id/edit', component: RecipeFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    // Our custom components, pipes, and directives.
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
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
