import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

  userData: any;
  today!: Date; // Declare the 'today' variable


  constructor(private sharedService: SharedService) {
    // const user = this.sharedService.getUser();
    // console.log(user);

  }

  ngOnInit() {
    this.userData = this.sharedService.getUser()
    if (this.userData) {
      this.userData = this.userData;
      // Use the user data as needed
    }

    console.log('Received user data:', this.userData);

    this.today = new Date();

  }



  // ngOnInit() {
  //   const user = this.sharedService.getUser();
  //   this.username = user ? user.username : '';
  // }

}
