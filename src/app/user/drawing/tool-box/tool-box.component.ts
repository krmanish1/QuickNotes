import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DrawingService } from '../services/drawing.service';
@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrl: './tool-box.component.scss'
})
export class ToolBoxComponent {
  @Output() toolBoxOperation = new EventEmitter<string>();
  Undo!: any;
  Redo!: any;
  hasCanvasContent!: boolean;

  @Input('childData') set childData({ toolboxdata }: { toolboxdata: any }) {
    this.Undo = toolboxdata.undo;
    this.Redo = toolboxdata.redo;
    this.hasCanvasContent = toolboxdata.hasCanvasContent;

    console.log("undo:-", this.Undo);
    console.log("redo:-", this.Redo);

  }

  constructor(private drawingService: DrawingService) { }


  operation(opt: string) {
    this.toolBoxOperation.emit(opt);
  }

}
