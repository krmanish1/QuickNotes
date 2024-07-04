import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

  public userData: any;
  today!: Date; // Declare the 'today' variable


  constructor(private sharedService: SharedService) {


  }

  ngOnInit() {
    this.sharedService.getUserData().then((data) => {
      this.userData = data;
      console.log('Received user data:', this.userData);
      // Use the user data as needed
    });

    this.today = new Date();

  }



}
