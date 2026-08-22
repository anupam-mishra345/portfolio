import { Component } from '@angular/core';
import { Footer } from 'src/constants/footer.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-footer-v2',
  templateUrl: './footer-v2.component.html',
  styleUrls: ['./footer-v2.component.scss'],
})
export class FooterV2Component {
  isDarkMode: boolean = false;
  socialPlatformData: any = Footer.socialPlatformData;
  isFormDisplay: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }

  showFormHandler(showForm: boolean) {
    this.isFormDisplay = showForm;
  }
}
