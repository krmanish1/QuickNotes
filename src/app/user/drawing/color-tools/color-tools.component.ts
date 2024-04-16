import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-tools',
  templateUrl: './color-tools.component.html',
  styleUrl: './color-tools.component.scss'
})
export class ColorToolsComponent {
  @Output() onColorChange = new EventEmitter<string>();

  colors = ['#000000', '#ff007f', '#c8ff00', '#0dff00', '#00a6ff', '#7700ff', '#ff002b', '#ff6200'];
  selectedColor: string = '#000000'// Default selected color

  selectColor(color: string) {
    this.selectedColor = color;
    this.onColorChange.emit(this.selectedColor);
  }
}
