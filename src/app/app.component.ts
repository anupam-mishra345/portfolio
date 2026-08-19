import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BackendService } from 'src/services/backend.service';
import { ThemeService } from 'src/services/theme.service';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portfolio';
  isDarkMode: boolean = false;
  scrollProgress = 0;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private backendService: BackendService,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (window.location.hostname !== 'localhost') {
          gtag('config', 'G-5RL4PLXJYJ', {
            page_path: this.router.url,
          });
        }
      });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    this.scrollProgress =
      documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
  }

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    this.backendService.testBackend().subscribe({
      next: (response) => {
        console.log('Backend response:', response);
      },
      error: (error) => {
        console.error('Backend error:', error);
      },
    });
  }
}
