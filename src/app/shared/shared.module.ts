import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MaterialModule } from './material/material.module';

@NgModule({
  exports: [MaterialModule, SlideshowModule],
})
export class SharedModule {}
