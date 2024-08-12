import { Component, ViewChild, viewChild } from '@angular/core';
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
import { LoaderComponent } from '../../shared/loader/loader.component';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // @ViewChild(LoaderComponent) loader?: LoaderComponent;

  errorMSG!: string
  constructor(
    private dataService: DataService,
    private serviceModal: NgbModal,
    private apiService: ApiService,
    private register_login_services: RegisterLoginService,
    private confirmationDialogService: DialogboxService,
    private sharedService: SharedService,
    private loaderService: LoaderService,
    private router: Router, // Inject the Router service


  ) { }

  modalClose() {
    if (this.dataService.modalInstance) {
      this.dataService.modalInstance.close();
    }
    this.dataService.modalInstance = null;
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
    this.loaderService.showLoader();
    this.errorMSG = '';
    const base_url = environment.BASE_URL + "api/login";
    if (this.loginForm.valid) {
      this.apiService.postCall(base_url, this.loginForm.value).subscribe(
        (response) => {
          this.register_login_services.setToken(response.user.token); // Call the login method with the token
          this.register_login_services.setUserId(response.user.id); // Call the login method with the token
          this.loaderService.hideLoader();

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
          this.loaderService.hideLoader();

        }
      );
    }
  }





}
