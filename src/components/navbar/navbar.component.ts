import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoaded: boolean = false;
  currentPath: string = '';
  resumeFilePath: string = '../../assets/pdfs/';
  resumeFileName: string = 'Anupam-Mishra-Resume.pdf';

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
