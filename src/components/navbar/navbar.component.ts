import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoaded: boolean = false;
  currentPath: string = '';
  resumeFilePath: string = '../../assets/pdfs/';
  resumeFileName: string = 'Anupam-Mishra-Resume.pdf';

  isDarkMode: boolean = false;
  isMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeMenu();
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  ngAfterContentChecked() {
    this.currentPath = this.router.url;
  }

  changeTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setTheme(this.isDarkMode);
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
    this.closeMenu();
  }

  contactMe() {
    this.closeMenu();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  openMenu() {
    this.isMenuOpen = true;
  }
  closeMenu() {
    this.isMenuOpen = false;
  }
}
