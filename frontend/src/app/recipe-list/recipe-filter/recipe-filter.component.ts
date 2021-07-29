import { Output } from '@angular/core';
import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.css'],
})
export class RecipeFilterComponent {
  @Output() filterInput = new EventEmitter<string>();
  filter = '';

  handleInput() {
    this.filterInput.emit(this.filter.toUpperCase());
  }
}
