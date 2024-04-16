import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterLoginComponent } from './register-login.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterLoginRoutingModule } from './register-login--routing.module';



@NgModule({
  declarations: [
    RegisterLoginComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RegisterLoginRoutingModule
  ]
})
export class RegisterLoginModule { }
