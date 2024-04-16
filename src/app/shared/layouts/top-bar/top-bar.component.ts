import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
  }


  profileToggle() {
    const toggleMenu = document.querySelector(".menu");
    if (toggleMenu) {
      toggleMenu.classList.toggle("active");
    }
  }


}
