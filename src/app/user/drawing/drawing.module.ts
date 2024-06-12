import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { WrittingToolsComponent } from './writting-tools/writting-tools.component';
import { ColorToolsComponent } from './color-tools/color-tools.component';
import { ToolBoxComponent } from './tool-box/tool-box.component';
import { DrawingComponent } from './drawing.component';
import { FormsModule } from '@angular/forms';
import { MainDrawingComponent } from './main-drawing/main-drawing.component';
import { CanvasCurdFormComponent } from './canvas-curd-form/canvas-curd-form.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DrawingComponent,
    CanvasComponent,
    WrittingToolsComponent,
    ColorToolsComponent,
    ToolBoxComponent,
    MainDrawingComponent,
    CanvasCurdFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbTooltipModule
  ]
})
export class DrawingModule { }
