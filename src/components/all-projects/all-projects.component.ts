import { Component } from '@angular/core';
import { Projects } from 'src/constants/project.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
})
export class AllProjectsComponent {
  allProjectData: any = Projects.projectsData;
  isDarkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    scrollTo(0, 0);
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }
}
