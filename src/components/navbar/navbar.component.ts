import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition,
// } from '@angular/animations';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoaded: boolean = false;
  currentPath: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  ngAfterContentChecked() {
    this.currentPath = this.router.url;
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  contactMe() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}
