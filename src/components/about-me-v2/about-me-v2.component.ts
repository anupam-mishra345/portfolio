import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-about-me-v2',
  templateUrl: './about-me-v2.component.html',
  styleUrls: ['./about-me-v2.component.scss'],
})
export class AboutMeV2Component {
  isDarkMode: boolean = false;
  totalExperience: number = 0;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    this.dataService.totalExperience.subscribe((value) => {
      this.totalExperience = value;
    });
  }
  navigateToAboutMe() {
    this.router.navigate(['/about-me']);
  }
}
