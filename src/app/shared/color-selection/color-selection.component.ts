import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-selection',
  templateUrl: './color-selection.component.html',
  styleUrl: './color-selection.component.scss'
})
export class ColorSelectionComponent {

  @Output() colorSelected = new EventEmitter<string>();

  selectColor(color: string) {
    this.colorSelected.emit(color);
  }

}
