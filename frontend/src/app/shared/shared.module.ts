import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MaterialModule } from './material/material.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  exports: [MaterialModule, CommonModule, SlideshowModule, SpinnerComponent, AlertComponent],
  imports: [MaterialModule],
  declarations: [SpinnerComponent, AlertComponent],
})
export class SharedModule {}