import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-writting-tools',
  templateUrl: './writting-tools.component.html',
  styleUrl: './writting-tools.component.scss',

})
export class WrittingToolsComponent {
  @Output() onSelectingWrittingTool = new EventEmitter<string>();
  selectedTool: string = 'pen';

  selectTool(tool: string) {
    this.selectedTool = tool;
    this.onSelectingWrittingTool.emit(this.selectedTool);
  }
}
