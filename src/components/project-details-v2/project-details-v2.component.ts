import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from 'src/constants/project.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-project-details-v2',
  templateUrl: './project-details-v2.component.html',
  styleUrls: ['./project-details-v2.component.scss'],
})
export class ProjectDetailsV2Component {
  isDarkMode: boolean = false;
  allProjectData: any = Projects.projectsData;
  projectData: any = {};

  constructor(private router: Router, private themeService: ThemeService) {
    const routeArray = this.router.url.split('/');
    const id = routeArray[routeArray.length - 1];

    this.projectData = this.allProjectData.filter(
      (elem: any) => elem.id === id
    )[0];
    console.log(this.projectData);
  }

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }
}
