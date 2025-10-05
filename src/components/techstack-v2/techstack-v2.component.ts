import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StackLogoConstant } from 'src/constants/stackAndLogos.constant';
import { DataService } from 'src/services/data.service';
import { ThemeService } from 'src/services/theme.service';

interface TechStack {
  name: string;
  logo: string;
}
interface TechStackObj {
  name: string;
  logo: string | undefined;
  info: string;
  description: string;
}

@Component({
  selector: 'app-techstack-v2',
  templateUrl: './techstack-v2.component.html',
  styleUrls: ['./techstack-v2.component.scss'],
})
export class TechstackV2Component {
  isDarkMode: boolean = false;
  techstacks: TechStackObj[] = [];
  allTechs: TechStack[] = StackLogoConstant.stackAndLogo;

  openDescriptionName = '';

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    this.dataService.portfolioGeneralGistData.subscribe((value) => {
      this.techstacks = value.techstacks.filter(
        (val: any, ind: any) => ind < 5
      );
      this.assignLogoToTechStacks();
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
  assignLogoToTechStacks() {
    this.techstacks.forEach((element: TechStackObj) => {
      element.logo = this.allTechs.find(
        (stack) => stack.name === element.name
      )?.logo;
      return element;
    });
  }
}
