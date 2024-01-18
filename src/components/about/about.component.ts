import { Component } from '@angular/core';
import { Experience } from 'src/constants/experience.constant';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  experienceData = Experience;

  ngOnInit() {
    scrollTo(0, 0);
  }
}
