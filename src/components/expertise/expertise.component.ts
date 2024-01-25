import { Component } from '@angular/core';
import { Expertise } from 'src/constants/expertise.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss'],
})
export class ExpertiseComponent {
  expertiseData = Expertise;
  isDarkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    scrollTo(0, 0);
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }
}
