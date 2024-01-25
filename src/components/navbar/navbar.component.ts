import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';

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

  isDarkMode: boolean = false;

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  ngAfterContentChecked() {
    this.currentPath = this.router.url;
  }

  changeTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setTheme(this.isDarkMode);
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  contactMe() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}
