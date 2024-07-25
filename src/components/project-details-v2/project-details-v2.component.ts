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
  currentIndex: number = 0;

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });

    const routeArray = this.router.url.split('/');
    const id = routeArray[routeArray.length - 1];
    this.fetchProjectDetails(id);
  }

  fetchProjectDetails(id: string) {
    this.projectData = this.allProjectData.filter(
      (elem: any, index: number) => {
        if (elem.id === id) {
          this.currentIndex = index;
          return elem;
        }
      }
    )[0];
    scroll(0, 0);
  }

  navigateNewProject(id: string) {
    this.fetchProjectDetails(id);
  }

  visitProject() {
    window.open(this.projectData.projectLink, '_blank');
  }
}
