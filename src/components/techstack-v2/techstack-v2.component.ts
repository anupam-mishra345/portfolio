import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TechStackConstant } from 'src/constants/techstack.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-techstack-v2',
  templateUrl: './techstack-v2.component.html',
  styleUrls: ['./techstack-v2.component.scss'],
})
export class TechstackV2Component {
  isDarkMode: boolean = false;
  techstacks = TechStackConstant.techstacks.filter((val, ind) => ind < 5);
  openDescriptionName = '';
  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }
  viewAllStacks() {
    this.router.navigate(['/techstack']);
  }
  showDescription(name: string) {
    if (this.openDescriptionName === name) {
      this.openDescriptionName = '';
    } else this.openDescriptionName = name;
  }
}
