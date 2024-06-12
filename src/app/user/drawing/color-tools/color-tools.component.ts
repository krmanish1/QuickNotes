import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-tools',
  templateUrl: './color-tools.component.html',
  styleUrl: './color-tools.component.scss'
})
export class ColorToolsComponent {
  @Output() onColorChange = new EventEmitter<string>();

  colors = ['#030B17', '#36E767', '#6B97EE', '#F08787', '#2487C1', '#9087E5', '#4CC1A8', '#4CB0D9'];
  selectedColor: string = '#030B17'// Default selected color

  selectColor(color: string) {
    this.selectedColor = color;
    this.onColorChange.emit(this.selectedColor);
  }
}
