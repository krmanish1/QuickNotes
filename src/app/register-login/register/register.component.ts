import { Component } from '@angular/core';
import { DataService } from '../../cors/service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(
    private dataService: DataService,
    private serviceModal: NgbModal

  ) { }

  modalClose() {
    if (this.dataService.modalInstance) {
      this.dataService.modalInstance.close();
    }
    this.dataService.modalInstance = null;
  }


  openLogin() {

    this.modalClose();
    this.dataService.modalInstance = this.serviceModal.open(
      LoginComponent,
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
