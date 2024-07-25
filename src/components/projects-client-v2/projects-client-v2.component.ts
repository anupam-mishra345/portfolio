import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-projects-client-v2',
  templateUrl: './projects-client-v2.component.html',
  styleUrls: ['./projects-client-v2.component.scss'],
})
export class ProjectsClientV2Component {
  isDarkMode: boolean = false;
  @ViewChild('logoList', { static: true }) logoList!: ElementRef;

  private isScrolling = false;
  private startX = 0;
  private scrollLeft = 0;

  clients = [
    {
      name: 'TATA AIA',
      logoLight: './assets/ClientProjectLogo/TataAIA.png',
      logoDark: './assets/ClientProjectLogo/TataAIA.png',
    },
    {
      name: 'Manipal Hospitals 2',
      logoLight: './assets/ClientProjectLogo/manipal-hospitals.svg',
      logoDark: './assets/ClientProjectLogo/manipal-hospitals.svg',
    },
    {
      name: 'Miles Education thick',
      logoLight: './assets/ClientProjectLogo/MilesThickLogo.png',
      logoDark: './assets/ClientProjectLogo/MilesThickLogo.png',
    },
    {
      name: 'Canera HSBC color',
      logoLight: './assets/ClientProjectLogo/Logo_color.svg',
      logoDark: './assets/ClientProjectLogo/Logo-SideNav.svg',
    },

    {
      name: 'TrustyX',
      logoLight: './assets/ClientProjectLogo/TrustyX.svg',
      logoDark: './assets/ClientProjectLogo/TrustyX.svg',
    },
    {
      name: 'Interview IA dark',
      logoLight: './assets/ClientProjectLogo/Interview-ia-light.png',
      logoDark: './assets/ClientProjectLogo/Interview-ia-dark.png',
    },
  ];

  clientsDuplicate = [...this.clients];

  constructor(
    private themeService: ThemeService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.changeClientsUI();
  }

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);

    const logoList = this.el.nativeElement.querySelector('.logo-list');
    const clone = logoList.cloneNode(true);
    this.renderer.appendChild(logoList.parentNode, clone);
  }

  changeClientsUI() {
    setInterval(() => {
      const temp: any = this.clientsDuplicate.pop();
      this.clientsDuplicate.unshift(temp);
    }, 1500);
  }
}
