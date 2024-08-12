import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../cors/service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

  public userData: any;
  today!: Date; // Declare the 'today' variable

  notesItem: any[] = [];

  constructor(
    private sharedService: SharedService,
    private apiService: ApiService,
    private router: Router, // Inject the Router service


  ) {


  }

  ngOnInit() {
    this.sharedService.getUserData().then((data) => {
      this.userData = data;
      // console.log('Received user data:', this.userData);
      // Use the user data as needed
    });

    this.today = new Date();
    this.getAllStickyNotes()

  }

  async getAllStickyNotes() {

    const base_url = environment.BASE_URL + "api/getAllStickyNote";
    try {
      const response = await this.apiService.getCall(base_url).toPromise();
      this.notesItem = response;
      console.log("this.notesItem:", this.notesItem);


    } catch (error) {
      console.error("Error:", error);
    }
  }
  goToStickynote() {
    this.router.navigate(['/user/stickeynote']); // Replace '/dashboard' with the actual route to your dashboard
  }

}
