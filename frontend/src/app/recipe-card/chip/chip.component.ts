import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
})
export class ChipComponent {
  @Input() text = 'Default text';
}
