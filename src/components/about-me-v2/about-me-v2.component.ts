import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-about-me-v2',
  templateUrl: './about-me-v2.component.html',
  styleUrls: ['./about-me-v2.component.scss'],
})
export class AboutMeV2Component {
  isDarkMode: boolean = false;

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }
  navigateToAboutMe() {
    this.router.navigate(['/about-me-v3']);
  }
}
