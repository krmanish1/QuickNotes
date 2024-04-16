import { Component } from '@angular/core';
import { DataService } from '../../cors/service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(
    private dataService: DataService,
    private serviceModal: NgbModal,
    private router: Router, // Inject the Router service


  ) { }

  modalClose() {
    if (this.dataService.modalInstance) {
      this.dataService.modalInstance.close();
    }
    this.dataService.modalInstance = null;
  }

  logIn() {
    this.router.navigate(['/user/dashboard']); // Replace '/dashboard' with the actual route to your dashboard

  }


  openRegister() {
    this.modalClose();
    this.dataService.modalInstance = this.serviceModal.open(
      RegisterComponent,
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
