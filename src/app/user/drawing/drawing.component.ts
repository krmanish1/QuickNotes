import { Component } from '@angular/core';
import { ApiService } from '../../cors/service/api.service';
import { DialogboxService } from '../../Dialog-box/services/dialogbox.service';
import { environment } from '../../../environments/environment.development';
import { DataService } from '../../cors/service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CanvasCurdFormComponent } from './canvas-curd-form/canvas-curd-form.component';


@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrl: './drawing.component.scss'
})
export class DrawingComponent {

  constructor(private apiService: ApiService, private confirmationDialogService: DialogboxService, private dataService: DataService, private serviceModal: NgbModal) {

  }

  addCanvas() {
    // const base_url = environment.BASE_URL + `api/deletestickyNotes/${id}`;
    this.dataService.modalInstance = this.serviceModal.open(
      CanvasCurdFormComponent,
      {
        windowClass: "modal-35",
        backdrop: 'static', // Disables closing the modal by clicking the backdrop
        keyboard: false // Disables closing the modal by pressing the ESC key
      }
    );

    this.dataService.modalInstance.result.then(
      () => {
        // Handle modal dismissal here
        console.log('Modal dismissed with OK');
      },
      (reason) => {
        if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          // Handle backdrop click here
          console.log('Modal dismissed by clicking outside');
        } else {
          // Handle other dismissal reasons here
          console.log('Modal dismissed with other reason:', reason);
        }
      }
    );
  }

}


