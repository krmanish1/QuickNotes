import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterLoginService } from '../../register-login/service/register-login.service';
import { ApiService } from '../../cors/service/api.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private apiservice: ApiService, private authService: RegisterLoginService) { }

  userData: any;
  private menuState = new BehaviorSubject<boolean>(true);
  isMenuExpanded = this.menuState.asObservable();

  toggleMenu() {
    this.menuState.next(!this.menuState.value);
  }

  private userDataSubject = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.userDataSubject.asObservable();


  async getUserData(): Promise<any> {
    // Verify the user is authenticated before making the GET call
    if (await this.authService.isLoggedIn()) {
      const userId = this.authService.getUserId();
      const base_url = environment.BASE_URL + `api/users/${userId}`;
      try {
        const response = await this.apiservice.getCall(base_url).toPromise();
        this.userData = response;
        this.userDataSubject.next(response);
        return response; // Return the fetched data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        return null; // Return null or handle the error appropriately
      }
    } else {
      // If the user is not authenticated, return an error or redirect to login page
      console.error("User is not authenticated");
      return null; // Return null or handle the case appropriately
    }
  }

}

// Add the HTTP interceptor to the providers array


