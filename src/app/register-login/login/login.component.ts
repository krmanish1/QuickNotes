import { Component } from '@angular/core';
import { DataService } from '../../cors/service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../cors/service/api.service';
import { environment } from '../../../environments/environment.development';
import { RegisterLoginService } from '../service/register-login.service';
import { DialogboxService } from '../../Dialog-box/services/dialogbox.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(
    private dataService: DataService,
    private serviceModal: NgbModal,
    private apiService: ApiService,
    private register_login_services: RegisterLoginService,
    private confirmationDialogService: DialogboxService,
    private router: Router, // Inject the Router service


  ) { }

  modalClose() {
    if (this.dataService.modalInstance) {
      this.dataService.modalInstance.close();
    }
    this.dataService.modalInstance = null;
  }

  // logIn() {
  //   this.router.navigate(['/user/dashboard']); // Replace '/dashboard' with the actual route to your dashboard

  // }


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



  loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }


  logIn() {
    // Handle form submission here
    console.log(this.loginForm.value);

    const base_url = environment.BASE_URL + "api/login";
    if (this.loginForm.valid) {
      this.apiService.postCall(base_url, this.loginForm.value).subscribe(
        (response) => {
          this.register_login_services.login(response.user.token); // Call the login method with the token
          this.modalClose();
          this.router.navigate(['/user/dashboard']); // Replace '/dashboard' with the actual route to your dashboard

        }, (error) => {
          console.log(error);
          this.confirmationDialogService.confirm('Error',
            error,
            'OK',
            'Cancel',
            'sm',
            'error')
            .then(async (confirmed) => {
              if (confirmed) {

              }
              console.log('User confirmed:', confirmed)
            }
            )
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
        }
      );
    }
  }

}
