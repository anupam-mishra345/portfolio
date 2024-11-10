import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  constructor(private themeService: ThemeService, private router: Router) {
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

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    console.log(environment.brevoApiKey);
  }
}
