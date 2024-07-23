import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from 'src/constants/footer.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-footer-v2',
  templateUrl: './footer-v2.component.html',
  styleUrls: ['./footer-v2.component.scss'],
})
export class FooterV2Component {
  isDarkMode: boolean = false;
  hoveringElement: string = '';
  hoveringId: string = '';
  socialPlatformData: any = Footer.socialPlatformData;

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }

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
