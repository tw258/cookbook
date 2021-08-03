import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MaterialModule } from './material/material.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  exports: [MaterialModule, CommonModule, SlideshowModule, SpinnerComponent],
  imports: [MaterialModule],
  declarations: [SpinnerComponent],
})
export class SharedModule {}
