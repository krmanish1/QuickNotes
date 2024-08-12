import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loadingSubject = new Subject<boolean>();

  loadingAction$ = this.loadingSubject.asObservable();

  showLoader() {
    console.log("loader started1");

    this.loadingSubject.next(true);
    console.log("loader started2");
  }
  hideLoader() {
    this.loadingSubject.next(false);
    console.log("loader started");
  }
}
