import { Component } from '@angular/core';
import { DataService } from '../../cors/service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../../cors/service/api.service';
import { environment } from '../../../environments/environment.development';
import { RegisterLoginService } from '../service/register-login.service';
import { DialogboxService } from '../../Dialog-box/services/dialogbox.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errorMSG!: string
  constructor(
    private dataService: DataService,
    private serviceModal: NgbModal,
    private apiService: ApiService,
    private register_login_services: RegisterLoginService,
    private confirmationDialogService: DialogboxService,
    private sharedService: SharedService,
    private router: Router, // Inject the Router service


  ) { }

  modalClose() {
    if (this.dataService.modalInstance) {
      this.dataService.modalInstance.close();
    }
    this.dataService.modalInstance = null;
  }


  openRegister() {
    this.modalClose();
    this.dataService.modalInstance = this.serviceModal.open(
      RegisterComponent,
      {
        windowClass: "modal-35",
        backdrop: 'static', // Disables closing the modal by clicking the backdrop
        keyboard: false, // Disables closing the modal by pressing the ESC key
        centered: true
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

  // Custom validator function
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { 'invalidFormat': true };
    };
  }

  loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.emailValidator()]),
      password: new FormControl('', Validators.required)
    });
  }


  logIn() {
    // Handle form submission here
    console.log(this.loginForm.value);
    this.errorMSG = '';
    const base_url = environment.BASE_URL + "api/login";
    if (this.loginForm.valid) {
      this.apiService.postCall(base_url, this.loginForm.value).subscribe(
        (response) => {
          this.register_login_services.login(response.user.token); // Call the login method with the token
          this.sharedService.setUser(response.user); // Store the user data

          this.modalClose();
          this.router.navigate(['/user/dashboard']); // Replace '/dashboard' with the actual route to your dashboard
          this.confirmationDialogService.confirm('Success',
            response.message,
            'OK',
            'Cancel',
            'sm',
            'success')
            .then(async (confirmed) => {
              if (confirmed) {

              }
              console.log('User confirmed:', confirmed)
            }
            )
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
        }, (error) => {
          console.log(error);
          this.errorMSG = error;
        }
      );
    }
  }



  openForgotPassword() {
    this.modalClose();
    this.dataService.modalInstance = this.serviceModal.open(
      ForgotPasswordComponent,
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
