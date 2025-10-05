import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-all-projects-v2',
  templateUrl: './all-projects-v2.component.html',
  styleUrls: ['./all-projects-v2.component.scss'],
})
export class AllProjectsV2Component {
  isDarkMode: boolean = false;
  projectData: any = [];

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    this.dataService.portfolioProjectsGistData.subscribe((value) => {
      this.projectData = value.projectsData;
    });
    scrollTo(0, 0);
  }

  viewAllProjects() {
    this.router.navigate(['/all-projects']);
  }

  navigateTo(id: string) {
    const url = '/project-details/' + id;
    this.router.navigate([url]);
  }
}
