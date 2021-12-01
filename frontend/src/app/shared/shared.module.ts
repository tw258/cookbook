import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { FormsModule } from '@angular/forms';
import { GermanDatePipe } from './german-date.pipe';
import { ToPipe } from './to.pipe';
import { ClearOnFocusDirective } from './clear-on-focus.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    MaterialModule,
    GermanDatePipe,
    FormsModule,
    CommonModule,
    ToPipe,
    SpinnerComponent,
    AlertComponent,
    ClearOnFocusDirective,
    ReactiveFormsModule,
  ],
  imports: [MaterialModule, CommonModule],
  declarations: [SpinnerComponent, AlertComponent, GermanDatePipe, ToPipe, ClearOnFocusDirective],
})
export class SharedModule {}
