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




  @ViewChild('themeToggleDarkIcon', { static: true }) themeToggleDarkIcon: ElementRef | undefined;
  @ViewChild('themeToggleLightIcon', { static: true }) themeToggleLightIcon: ElementRef | undefined;
  @ViewChild('themeToggleBtn', { static: true }) themeToggleBtn: ElementRef | undefined;

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

    this.toggleIconsBasedOnTheme();
    if (this.themeToggleBtn) {
      this.themeToggleBtn.nativeElement.addEventListener('click', () => this.toggleTheme());
    }
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
    this.router.navigate(['/QuickNote/home']); // Replace '/dashboard' with the actual route to your dashboard
  }



  ngOnInit(): void {
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
