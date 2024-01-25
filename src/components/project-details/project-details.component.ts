import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from 'src/constants/project.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {
  allProjectData: any = Projects.projectsData;
  projectData: any = {};
  isDarkMode: boolean = false;

  constructor(private router: Router, private themeService: ThemeService) {
    const routeArray = this.router.url.split('/');
    const id = routeArray[routeArray.length - 1];

    this.projectData = this.allProjectData.filter(
      (elem: any) => elem.id === id
    )[0];
  }

  ngOnInit() {
    scrollTo(0, 0);
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }

  visitProject() {
    window.open(this.projectData.projectLink, '_blank');
  }

  goBack() {
    this.router.navigate(['/all-projects']);
  }
}
