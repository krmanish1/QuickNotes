import { Component, OnInit, PLATFORM_ID, Inject, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DrawingService } from '../services/drawing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public drawingService: DrawingService) { }

  @ViewChild('canvas') canvas!: ElementRef;
  context!: CanvasRenderingContext2D;
  undoSteps: { [key: number]: { offsetX: number; offsetY: number }[] } = {};
  redoStep: { [key: number]: { offsetX: number; offsetY: number }[] } = {};
  undo: number = 0;
  redo: number = 0;
  isDrawing = false;
  toolWidth = 1;
  selectedTool: string = 'pen'
  selectedColor: string = "#000000"; // This will hold the color selected in the child component
  hasCanvasContent: boolean = false;


  ngOnInit() {

  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;
      // this.canvas.nativeElement.style.width = `${window.innerWidth}px`;
      // this.canvas.nativeElement.style.height = `${window.innerHeight}px`;
      // this.context.fillRect(offsetX, offsetY, 1, 1);

      this.context = this.canvas.nativeElement.getContext('2d');
      this.context.scale(2, 2);
      this.context.lineCap = 'round';
      this.context.strokeStyle = 'black';
      this.context.lineWidth = 5;
      this.setCanvasBackground();
    }
  }

  onColorChange(color: string) {
    this.selectedColor = color;
    // Now you can use this.selectedColor in your parent component
  }


  onSelectingWrittingTool(tool: string) {
    const previousTool = this.selectedTool;
    const previousColor = this.selectedColor;

    if (tool === 'eraserAll') {
      this.clearCanvas();
      this.selectedTool = previousTool;
      this.selectedColor = previousColor;
      this.redo = 0
      this.undo = 0;
      this.redoStep = {};
      this.undoSteps = {}

      this.updateCanvasContext(); // Update the canvas context after clearing
    } else {
      this.selectedTool = tool;
      this.updateCanvasContext(); // Update the canvas context when changing tools
    }
  }

  updateCanvasContext() {

    if (this.selectedTool === "pen") {
      this.context.lineCap = 'round';
      this.context.lineWidth = 3; // passing brushSize as line width
      this.toolWidth = this.context.lineWidth
      this.context.strokeStyle = this.selectedColor;
      this.context.fillStyle = this.selectedColor; // passing selectedColor as fill style

    } else if (this.selectedTool === "pencil") {
      this.context.lineCap = 'round';

      this.context.lineWidth = 1; // passing brushSize as line width
      this.toolWidth = this.context.lineWidth
      this.context.strokeStyle = this.selectedColor;
      this.context.fillStyle = this.selectedColor; // passing selectedColor as fill style
    }
    else if (this.selectedTool === "marker") {
      this.context.lineCap = 'round';

      this.context.lineWidth = 8; // passing brushSize as line width
      this.toolWidth = this.context.lineWidth
      this.context.strokeStyle = this.selectedColor;
      this.context.fillStyle = this.selectedColor; // passing selectedColor as fill style
    }
    else if (this.selectedTool === "highlighter") {
      this.context.lineWidth = 16; // passing brushSize as line width
      this.toolWidth = this.context.lineWidth
      // Adjust the alpha value to make the color less transparent
      const alphaColor = this.hexToRGBA(this.selectedColor, 0.1); // Example: 'rgba(255, 255, 255, 0.8)'
      this.context.strokeStyle = alphaColor;
      this.context.fillStyle = alphaColor; // passing selectedColor as fill style with reduced transparency
    }
    else if (this.selectedTool === "eraser") {
      this.context.lineWidth = 20; // passing brushSize as line width
      this.toolWidth = this.context.lineWidth
      this.context.strokeStyle = "#fff";
      this.context.fillStyle = this.selectedTool === "eraser" ? "#fff" : this.selectedTool; // passing selectedColor as fill style
    }
    else if (this.selectedTool === "brush") {
      this.context.lineWidth = 10; // passing brushSize as line width
      this.toolWidth = this.context.lineWidth
      this.context.strokeStyle = this.selectedColor;
      this.context.fillStyle = this.selectedColor; // passing selectedColor as fill style
    }

    // After updating the content, check if the canvas has content
    // This check is now more optimized and only happens when necessary
    if (this.hasCanvasContent) {
      const imageData = this.context.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.hasCanvasContent = imageData.data.some(channel => channel !== 0);
    }

  }

  startDrawing(event: MouseEvent) {
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    this.context.fillRect(offsetX, offsetY, 1, 1);


    this.context.beginPath();
    this.context.moveTo(offsetX, offsetY);
    this.undoSteps = { ...this.undoSteps, [this.undo + 1]: [] };
    this.undoSteps[this.undo + 1].push({ offsetX, offsetY });
    this.undo++;
    this.isDrawing = true;
    this.hasCanvasContent = true;

  }

  finishDrawing() {
    this.context.closePath();
    this.isDrawing = false;
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing) {
      return;
    }
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    this.context.fillRect(offsetX, offsetY, 1, 1);

    this.context.lineTo(offsetX, offsetY);
    this.context.stroke();

    this.updateCanvasContext();

    this.undoSteps = { ...this.undoSteps };
    this.undoSteps[this.undo].push({ offsetX, offsetY });
  }

  undoLastOperation() {
    if (this.undo > 0) {
      const data = this.undoSteps[this.undo];
      this.context.strokeStyle = '#fff';
      this.context.fillStyle = '#fff'
      this.context.beginPath();
      this.context.lineWidth = this.toolWidth;
      this.context.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          this.context.lineTo(item.offsetX, item.offsetY);
          this.context.stroke();
        }
      });
      this.context.closePath();
      this.context.strokeStyle = this.selectedColor;
      const temp = { ...this.undoSteps, [this.undo]: [] };
      const te = { ...this.redoStep, [this.redo + 1]: [...data] };
      this.undo--;
      this.redo++;
      this.redoStep = te;
      this.undoSteps = temp;
    }
  }

  redoLastOperation() {
    if (this.redo > 0) {
      const data = this.redoStep[this.redo];
      this.context.strokeStyle = this.selectedColor;
      this.context.beginPath();
      this.context.lineWidth = this.toolWidth;
      this.context.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          this.context.lineTo(item.offsetX, item.offsetY);
          this.context.stroke();
        }
      });
      this.context.closePath();
      const temp = { ...this.redoStep, [this.redo]: [] };
      this.undo++;
      this.redo--;
      this.redoStep = temp;
      this.undoSteps = { ...this.undoSteps, [this.undo + 1]: [...data] };
    }
  }

  toolBoxOperation(operation: string) {
    if (operation == 'undo') {
      this.undoLastOperation();
    } else if (operation == 'redo') {
      this.redoLastOperation();
    } else if (operation == 'download') {
      this.downloadCanvasAsImage();
    }
  }


  clearCanvas = () => {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // clearing whole canvas 
    this.hasCanvasContent = false;

    this.setCanvasBackground();
  }

  setCanvasBackground = () => {
    // setting whole canvas background to white, so the downloaded img background will be white
    this.context.fillStyle = "#fff";
    this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    // this.context.fillStyle = this.selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
  }


  hexToRGBA(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }


  downloadCanvasAsImage() {
    const canvas = this.canvas.nativeElement;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'canvas-image.png'; // Set the file name for the downloaded image
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
