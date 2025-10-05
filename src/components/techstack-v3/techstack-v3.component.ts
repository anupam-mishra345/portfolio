import { Component } from '@angular/core';
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
  selector: 'app-techstack-v3',
  templateUrl: './techstack-v3.component.html',
  styleUrls: ['./techstack-v3.component.scss'],
})
export class TechstackV3Component {
  isDarkMode: boolean = false;
  techstacks: TechStackObj[] = [];
  allTechs: TechStack[] = StackLogoConstant.stackAndLogo;

  constructor(
    private themeService: ThemeService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    this.dataService.portfolioGeneralGistData.subscribe((value) => {
      this.techstacks = value.techstacks;
      this.assignLogoToTechStacks();
    });
    scrollTo(0, 0);
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
