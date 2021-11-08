import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { FormsModule } from '@angular/forms';
import { GermanDatePipe } from './german-date.pipe';

@NgModule({
  exports: [
    MaterialModule,
    GermanDatePipe,
    FormsModule,
    CommonModule,
    SpinnerComponent,
    AlertComponent,
  ],
  imports: [MaterialModule],
  declarations: [SpinnerComponent, AlertComponent, GermanDatePipe],
})
export class SharedModule {}
