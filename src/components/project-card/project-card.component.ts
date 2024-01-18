import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() projectData: any = {};

  constructor(private router: Router) {}
  navigateTo() {
    const url = '/project-details/' + this.projectData.id;
    this.router.navigateByUrl(url);
  }
}
