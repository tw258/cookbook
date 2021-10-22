import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  exports: [MaterialModule, CommonModule, SpinnerComponent, AlertComponent],
  imports: [MaterialModule],
  declarations: [SpinnerComponent, AlertComponent],
})
export class SharedModule {}
