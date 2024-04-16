import { Component } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {



  isMenuExpanded = true;

  constructor(private sharedServices: SharedService) { }

  ngOnInit() {
    this.sharedServices.isMenuExpanded.subscribe(expanded => {
      this.isMenuExpanded = expanded;
    });
  }

}
