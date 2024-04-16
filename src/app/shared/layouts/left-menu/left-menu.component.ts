import { Component, ElementRef } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

  constructor(
    private elRef: ElementRef,
    private sharedServices: SharedService
    // public userAuthService: UserAuthService
  ) { }


  ngAfterViewInit() {
    setTimeout(() => {
      this.setupArrowClick();
    }, 10);
  }

  private setupArrowClick() {
    let arrow = this.elRef.nativeElement.querySelectorAll(".arrow");
    for (let i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (event: MouseEvent) => {
        let targetElement = event.target as HTMLElement;
        let arrowParent = targetElement.parentElement?.parentElement;
        if (arrowParent) {
          arrowParent.classList.toggle("showMenu");
        }
      });
    }
  }

  isMenuExpanded = false; // Add a property to track the menu state

  toggleMenu() {
    this.sharedServices.toggleMenu();
    this.isMenuExpanded = !this.isMenuExpanded; // Toggle the menu state
    const sidebarElement = document.querySelector('.sidebar');
    if (sidebarElement) {
      if (this.isMenuExpanded) {
        sidebarElement.classList.remove('close');
      } else {
        sidebarElement.classList.add('close');
      }
    }
  }
}
