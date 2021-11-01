import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() text = 'Default Alert';
  @Input() type: 'success' | 'error' | 'info' = 'info';

  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
  }
}
