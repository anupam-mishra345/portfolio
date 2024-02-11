import { Component } from '@angular/core';
import { Footer } from 'src/constants/footer.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  hoveringElement: string = '';
  hoveringId: string = '';
  socialPlatformData: any = Footer.socialPlatformData;

  enableHovering(platform: string, id: string) {
    this.hoveringElement = platform;
    this.hoveringId = id;
  }
  disableHovering() {
    this.hoveringElement = '';
    this.hoveringId = '';
  }
  getStackColor(social: string) {
    if (social === '') {
      return this.socialPlatformData.filter(
        (elem: any) => elem.name === this.hoveringElement
      )[0].color;
    } else {
      return this.socialPlatformData.filter(
        (elem: any) => elem.name === social
      )[0].color;
    }
  }
}
