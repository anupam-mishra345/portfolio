import { Component } from '@angular/core';
import { TechStackConstant } from 'src/constants/techstack.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-techstack-v3',
  templateUrl: './techstack-v3.component.html',
  styleUrls: ['./techstack-v3.component.scss'],
})
export class TechstackV3Component {
  isDarkMode: boolean = false;
  techstacks = TechStackConstant.techstacks;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }
}
