import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { RegisterLoginModule } from '../register-login/register-login.module';



@NgModule({
  declarations: [
    LandingPageComponent,
    NavbarComponent,
    ContactusComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
  ]
})
export class LandingPageModule { }
