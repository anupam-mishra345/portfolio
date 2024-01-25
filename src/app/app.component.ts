import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portfolio';
  isDarkMode: boolean = false;

  constructor(
    private themeService: ThemeService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
      // const body = this.el.nativeElement.ownerDocument.body;
      // const newBackgroundColor = this.isDarkMode ? '#000' : '#fff';

      // this.renderer.setStyle(body, 'background-color', newBackgroundColor);
    });
  }
}
