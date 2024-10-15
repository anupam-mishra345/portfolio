import { Component, Input } from '@angular/core';
import { StackLogoConstant } from 'src/constants/stackAndLogos.constant';

interface TechStack {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-technology-comp',
  templateUrl: './technology-comp.component.html',
  styleUrls: ['./technology-comp.component.scss'],
})
export class TechnologyCompComponent {
  @Input() techName: string = '';

  currentStack: TechStack | undefined = {
    name: '',
    logo: '',
  };
  allTechs: TechStack[] = StackLogoConstant.stackAndLogo;

  ngOnChanges() {
    if (this.techName !== '') {
      this.currentStack = this.allTechs.find(
        (stack) => stack.name === this.techName
      );
    }
  }
}
