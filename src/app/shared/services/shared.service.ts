import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private menuState = new BehaviorSubject<boolean>(true);
  isMenuExpanded = this.menuState.asObservable();

  toggleMenu() {
    this.menuState.next(!this.menuState.value);
  }
}
