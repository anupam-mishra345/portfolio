import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-navbar-v2',
  templateUrl: './navbar-v2.component.html',
  styleUrls: ['./navbar-v2.component.scss'],
})
export class NavbarV2Component {
  isDarkMode: boolean = false;
  isMenuOpen: boolean = false;
  @ViewChild('menu_list') menu_list!: ElementRef;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }

  changeTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setTheme(this.isDarkMode);
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
    this.showMenu(false);
  }

  showMenu(displayMenu: boolean) {
    this.isMenuOpen = displayMenu;
    this.animationFun();
  }

  animationFun() {
    if (this.isMenuOpen) {
      setTimeout(() => {
        // Set height to auto to calculate the scrollHeight
        this.renderer.setStyle(
          this.menu_list.nativeElement,
          'max-height',
          'none'
        );
        const scrollHeight = this.menu_list.nativeElement.scrollHeight;
        this.renderer.setStyle(this.menu_list.nativeElement, 'max-height', '0');

        // Force reflow to apply the transition
        this.menu_list.nativeElement.offsetHeight;

        this.renderer.setStyle(
          this.menu_list.nativeElement,
          'max-height',
          `${scrollHeight}px`
        );
      }, 0);
    } else {
      setTimeout(() => {
        const scrollHeight = this.menu_list.nativeElement.scrollHeight;
        this.renderer.setStyle(
          this.menu_list.nativeElement,
          'max-height',
          `${scrollHeight}px`
        );

        // Force reflow to apply the transition
        this.menu_list.nativeElement.offsetHeight;

        this.renderer.setStyle(this.menu_list.nativeElement, 'max-height', '0');
      }, 0);
    }
  }
}
