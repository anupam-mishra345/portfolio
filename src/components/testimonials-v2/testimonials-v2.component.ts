import { Component } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-testimonials-v2',
  templateUrl: './testimonials-v2.component.html',
  styleUrls: ['./testimonials-v2.component.scss'],
})
export class TestimonialsV2Component {
  isDarkMode: boolean = false;
  remarks: any = [];

  constructor(
    private themeService: ThemeService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    this.dataService.portfolioGeneralGistData.subscribe((value) => {
      this.remarks = value.manager_reviews;
    });
    scrollTo(0, 0);
  }
}
