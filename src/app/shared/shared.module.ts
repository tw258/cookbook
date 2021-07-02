import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MaterialModule } from './material/material.module';

@NgModule({
  exports: [MaterialModule, CommonModule, SlideshowModule],
})
export class SharedModule {}
