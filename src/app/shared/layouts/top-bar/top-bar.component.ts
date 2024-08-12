import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RegisterLoginService } from '../../../register-login/service/register-login.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  userData: any;

  constructor(
    private register_login_services: RegisterLoginService,
    private router: Router, // Inject the Router service
    private sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    // private scrollService: ServiceService,
    private cdr: ChangeDetectorRef,


  ) {

  }


  @ViewChild('themeToggleDarkIcon', { static: true }) themeToggleDarkIcon: ElementRef | undefined;
  @ViewChild('themeToggleLightIcon', { static: true }) themeToggleLightIcon: ElementRef | undefined;
  @ViewChild('themeToggleBtn', { static: true }) themeToggleBtn: ElementRef | undefined;


  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.sharedService.getUserData().then((data) => {
      this.userData = data;
      console.log('Received user data:', this.userData);
      // Use the user data as needed
    });

    if (isPlatformBrowser(this.platformId)) {
      // Initialize Flowbite or any other library that relies on the document object here
      // For example:
      // initFlowbite();
      // Check localStorage for the stored theme and apply it
      const storedTheme = localStorage.getItem('color-theme');
      if (storedTheme) {
        this.applyTheme(storedTheme as 'dark' | 'light');
      } else {
        // If no theme is stored, set the default theme to dark
        this.applyTheme('dark');
      }

      // Apply the initial theme
      this.toggleIconsBasedOnTheme();
    }
  }

  ngAfterViewInit() {


    this.toggleIconsBasedOnTheme();
    if (this.themeToggleBtn) {
      this.themeToggleBtn.nativeElement.addEventListener('click', () => this.toggleTheme());
    }
  }



  profileToggle() {
    const toggleMenu = document.querySelector(".menu");
    if (toggleMenu) {
      toggleMenu.classList.toggle("active");
    }
  }

  logout() {
    this.register_login_services.logout(); // Call the login method with the token
    this.router.navigate(['/login']); // Replace '/dashboard' with the actual route to your dashboard
  }




  applyTheme(theme: 'dark' | 'light'): void {
    if (theme === 'dark') {
      this.renderer.addClass(this.document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
    }
    // Update localStorage with the current theme
    localStorage.setItem('color-theme', theme);
    this.cdr.detectChanges(); // Manually trigger change detection
  }



  toggleIconsBasedOnTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem('color-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      if (theme === 'dark') {
        if (this.themeToggleLightIcon && this.themeToggleLightIcon.nativeElement) {
          this.renderer.addClass(this.themeToggleLightIcon.nativeElement, 'hidden');
        }
        if (this.themeToggleDarkIcon && this.themeToggleDarkIcon.nativeElement) {
          this.renderer.removeClass(this.themeToggleDarkIcon.nativeElement, 'hidden');
        }
      } else {
        if (this.themeToggleDarkIcon && this.themeToggleDarkIcon.nativeElement) {
          this.renderer.addClass(this.themeToggleDarkIcon.nativeElement, 'hidden');
        }
        if (this.themeToggleLightIcon && this.themeToggleLightIcon.nativeElement) {
          this.renderer.removeClass(this.themeToggleLightIcon.nativeElement, 'hidden');
        }
      }
      this.cdr.detectChanges();
    }
  }

  toggleTheme(): void {
    const theme = localStorage.getItem('color-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'light') {
      this.renderer.addClass(this.document.documentElement, 'dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
      localStorage.setItem('color-theme', 'light');
    }
    this.toggleIconsBasedOnTheme();
  }


}
