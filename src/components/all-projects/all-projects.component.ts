import { Component } from '@angular/core';
import { Projects } from 'src/constants/project.constant';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
})
export class AllProjectsComponent {
  allProjectData: any = Projects.projectsData;

  ngOnInit() {
    scrollTo(0, 0);
  }
}
