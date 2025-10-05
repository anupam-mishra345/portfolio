import { Component } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';
import { DataService } from 'src/services/data.service';
import { GistData } from 'src/constants/gist-data.constant';

@Component({
  selector: 'app-about-me-v3',
  templateUrl: './about-me-v3.component.html',
  styleUrls: ['./about-me-v3.component.scss'],
})
export class AboutMeV3Component {
  isDarkMode: boolean = false;
  totalExperience: number = 0;
  currentCompanyExperience: number = 0;
  openProjectId: string = '';
  experience: any;
  awards: any;
  projectData: any;
  clientProjectCount: number = 0;
  myOwnProjectCount: number = 0;

  constructor(
    private themeService: ThemeService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
    this.dataService.totalExperience.subscribe((value) => {
      this.totalExperience = value;
    });
    this.dataService.currentCompanyExperience.subscribe((value) => {
      this.currentCompanyExperience = value;
    });
    this.dataService.portfolioExperienceGistData.subscribe((value) => {
      this.experience = value.experience;
    });
    this.dataService.portfolioProjectsGistData.subscribe((value) => {
      this.projectData = value.projectsData;
    });
    this.dataService.portfolioGeneralGistData.subscribe((value) => {
      this.awards = value.awards;
    });
    this.fetchProjectsCount();
  }

  downloadResume() {
    const filePath = GistData.resumeUrl;
    const a = document.createElement('a');
    a.href = filePath;

    a.download = 'Anupam Mishra Resume.pdf';
    document.body.appendChild(a);
    a.click();
  }

  openProjectDetails(id: string) {
    if (this.openProjectId === id) {
      this.openProjectId = '';
    } else {
      this.openProjectId = id;
    }
  }

  fetchProjectsCount() {
    this.dataService.clientProjectCount.subscribe((value) => {
      this.clientProjectCount = value;
    });
    this.dataService.myOwnProjectCount.subscribe((value) => {
      this.myOwnProjectCount = value;
    });
  }
}
