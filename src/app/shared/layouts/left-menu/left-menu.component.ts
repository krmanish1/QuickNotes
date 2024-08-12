import { ChangeDetectorRef, Component, ElementRef, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { RegisterLoginService } from '../../../register-login/service/register-login.service';
import { Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {






  constructor(
    private elRef: ElementRef,
    private sharedServices: SharedService,
    // public userAuthService: UserAuthService
    private register_login_services: RegisterLoginService,
    private router: Router, // Inject the Router service
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    // private scrollService: ServiceService,
    private cdr: ChangeDetectorRef,
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


  logout() {
    this.register_login_services.logout(); // Call the login method with the token
    this.router.navigate(['/login']); // Replace '/dashboard' with the actual route to your dashboard
  }



}
