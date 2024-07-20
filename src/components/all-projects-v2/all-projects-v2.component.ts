import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from 'src/constants/project.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-all-projects-v2',
  templateUrl: './all-projects-v2.component.html',
  styleUrls: ['./all-projects-v2.component.scss'],
})
export class AllProjectsV2Component {
  isDarkMode: boolean = false;
  projectData = Projects.projectsData;

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }

  viewAllProjects() {
    this.router.navigate(['/all-projects-v3']);
  }
}
