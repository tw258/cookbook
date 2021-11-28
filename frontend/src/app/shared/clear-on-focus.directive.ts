import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClearOnFocus]',
})
export class ClearOnFocusDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('focus') onFocus() {
    this.el.nativeElement.value = '';
  }
}
