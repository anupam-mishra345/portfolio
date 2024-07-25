import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  insideHammerBtn: boolean = false;
  @ViewChild('menu_list') menu_list!: ElementRef;
  @ViewChild('main_div') main_div!: ElementRef;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private themeService: ThemeService,
    private eRef: ElementRef
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
  contactMe() {
    this.showMenu(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  showMenu(displayMenu: boolean) {
    this.isMenuOpen = displayMenu;
    this.animationFun();
    this.insideHammerBtn = displayMenu;
  }

  animationFun() {
    if (this.isMenuOpen) {
      setTimeout(() => {
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

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (
      this.isMenuOpen &&
      !this.insideHammerBtn &&
      !this.main_div.nativeElement.contains(event.target)
    ) {
      this.showMenu(false);
    }
    this.insideHammerBtn = false;
  }
}
