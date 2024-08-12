import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterLoginComponent } from './register-login.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterLoginRoutingModule } from './register-login--routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../cors/service/api.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    RegisterLoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RegisterLoginRoutingModule,
  ],
  exports: [RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,],
  providers: [
    ApiService, // Ensure ApiService is provided here if it's not already
  ],
})
export class RegisterLoginModule { }
