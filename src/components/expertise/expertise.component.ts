import { Component } from '@angular/core';
import { Expertise } from 'src/constants/expertise.constant';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss'],
})
export class ExpertiseComponent {
  expertiseData = Expertise;

  ngOnInit() {
    scrollTo(0, 0);
  }
}
