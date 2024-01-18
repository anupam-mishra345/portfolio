import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from 'src/constants/project.constant';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {
  allProjectData: any = Projects.projectsData;
  projectData: any = {};

  constructor(private router: Router) {
    const routeArray = this.router.url.split('/');
    const id = routeArray[routeArray.length - 1];

    this.projectData = this.allProjectData.filter(
      (elem: any) => elem.id === id
    )[0];
  }

  ngOnInit() {
    scrollTo(0, 0);
  }

  visitProject() {
    window.open(this.projectData.projectLink, '_blank');
  }

  goBack() {
    this.router.navigate(['/all-projects']);
  }
}
