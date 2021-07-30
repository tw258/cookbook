import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() text = 'Alert works!';
  @Input() type: 'success' | 'error' | 'info' = 'info';

  @Output() close = new EventEmitter<void>();

  handleClick() {
    this.close.emit();
  }
}
