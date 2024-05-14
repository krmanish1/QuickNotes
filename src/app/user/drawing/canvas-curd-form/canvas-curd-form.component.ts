import { Component } from '@angular/core';
import { DataService } from '../../../cors/service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-canvas-curd-form',
  templateUrl: './canvas-curd-form.component.html',
  styleUrl: './canvas-curd-form.component.scss'
})
export class CanvasCurdFormComponent {

  constructor(
    private dataService: DataService,
    private serviceModal: NgbModal,


  ) { }

  modalClose() {
    if (this.dataService.modalInstance) {
      this.dataService.modalInstance.close();
    }
    this.dataService.modalInstance = null;
  }

  createCanvas() {

  }

}
