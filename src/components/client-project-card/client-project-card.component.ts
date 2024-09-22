import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-project-card',
  templateUrl: './client-project-card.component.html',
  styleUrls: ['./client-project-card.component.scss'],
})
export class ClientProjectCardComponent {
  @Input()
  projectDetails: any = {};
}
