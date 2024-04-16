import { Injectable } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  modalInstance: NgbModalRef | null = null;

}
