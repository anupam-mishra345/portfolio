import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-all-projects-v3',
  templateUrl: './all-projects-v3.component.html',
  styleUrls: ['./all-projects-v3.component.scss'],
})
export class AllProjectsV3Component {
  isDarkMode: boolean = false;
  projectData: any = [];

  constructor(
    private themeService: ThemeService,
    private dataService: DataService,
    private router: Router
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
  navigateTo(id: string) {
    const url = '/project-details/' + id;
    this.router.navigate([url]);
  }
}
