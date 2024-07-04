import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RegisterLoginService } from '../../../register-login/service/register-login.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  userData: any;

  constructor(
    private register_login_services: RegisterLoginService,
    private router: Router, // Inject the Router service
    private sharedService: SharedService


  ) {

  }





  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.sharedService.getUserData().then((data) => {
      this.userData = data;
      console.log('Received user data:', this.userData);
      // Use the user data as needed
    });
  }


  profileToggle() {
    const toggleMenu = document.querySelector(".menu");
    if (toggleMenu) {
      toggleMenu.classList.toggle("active");
    }
  }

  logout() {
    this.register_login_services.logout(); // Call the login method with the token
    this.router.navigate(['/QuickNote/home']); // Replace '/dashboard' with the actual route to your dashboard
  }


}
