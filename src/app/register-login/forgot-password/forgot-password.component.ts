import { Component } from '@angular/core';
import { DataService } from '../../cors/service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../cors/service/api.service';
import { RegisterLoginService } from '../service/register-login.service';
import { DialogboxService } from '../../Dialog-box/services/dialogbox.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  isEmailvalid: boolean = false;
  succesMSG: string = "";
  errorMSG: string = "";

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

  // Custom validator function
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { 'invalidFormat': true };
    };
  }

  forgotPasswordForm!: FormGroup;
  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.emailValidator()]),
    });
  }


  setLink() {
    this.succesMSG = "";
    this.errorMSG = "";
    // Handle form submission here
    console.log(this.forgotPasswordForm.value);

    const base_url = environment.BASE_URL + "api/forgetPassword";
    if (this.forgotPasswordForm.valid) {
      this.apiService.postCall(base_url, this.forgotPasswordForm.value).subscribe(
        (response) => {
          // console.log("forgotpasswordresponses:-", response);
          this.succesMSG = response.message
          console.log(this.succesMSG);


        }, (error) => {
          // console.log(error);
          this.errorMSG = error.message;
          console.log(this.errorMSG);

        }
      );
    }
  }



}
