import { Component, OnInit } from '@angular/core';
import { DataService } from '../../cors/service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../../cors/service/api.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { DialogboxService } from '../../Dialog-box/services/dialogbox.service';
import { RegisterLoginService } from '../service/register-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {


  constructor(
    private dataService: DataService,
    private serviceModal: NgbModal,
    private apiService: ApiService,
    private router: Router,
    private confirmationDialogService: DialogboxService,
    private register_login_services: RegisterLoginService

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


  ngOnInit() {
    this.formControl();
  }


  // Custom validator to check if the name contains only alphabetic characters
  nameValidator(control: AbstractControl): ValidationErrors | null {
    const name = control.value;
    const regex = /^[a-zA-Z]+$/; // Regular expression to match names containing only letters
    return regex.test(name) ? null : { invalidName: true };
  }

  signupForm!: FormGroup;
  formControl() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.nameValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  onSignup() {
    const base_url = environment.BASE_URL + "api/signup";
    console.log("signupform data:-", this.signupForm.value);
    console.log("form validation:-", this.signupForm.valid);

    // Handle form submission here
    if (this.signupForm.valid) {
      this.apiService.postCall(base_url, this.signupForm.value).subscribe(
        (response) => {
          this.register_login_services.login(response.user.token); // Call the login method with the token
          this.modalClose();
          this.router.navigateByUrl('user/dashboard');
          console.log('HTTP Post successful:', response);
        }, (error) => {
          console.log("error:-", error);
          this.confirmationDialogService.confirm('Error',
            error.message,
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
