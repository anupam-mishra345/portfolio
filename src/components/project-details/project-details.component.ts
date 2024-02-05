import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from 'src/constants/project.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {
  allProjectData: any = Projects.projectsData;
  projectData: any = {};
  isDarkMode: boolean = false;
  divHeight: number = 0;
  @ViewChild('mainRight', { static: true }) mainRight!: ElementRef;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    const routeArray = this.router.url.split('/');
    const id = routeArray[routeArray.length - 1];

    this.projectData = this.allProjectData.filter(
      (elem: any) => elem.id === id
    )[0];
  }

  ngOnInit() {
    scrollTo(0, 0);
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    this.divHeight =
      this.mainRight.nativeElement.getBoundingClientRect().height;
    console.log(this.divHeight);
    this.cdr.detectChanges();
    // console.log(this.mainRight.nativeElement.);
  }
  ngAfterViewInit() {
    this.setRemainingHeight();
  }

  setRemainingHeight() {
    const mainRightHeight =
      this.el.nativeElement.querySelector('.tempDiv').offsetHeight;
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('.remaining-height'),
      'height',
      `${mainRightHeight}px`
    );
    const leftImgHeight =
      this.el.nativeElement.querySelector('.project-ss').offsetHeight;
    const leftBtnHeight =
      this.el.nativeElement.querySelector('.sticky-btn').offsetHeight;
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('.final-remainingDiv'),
      'height',
      `${mainRightHeight - leftImgHeight - leftBtnHeight}px`
    );
  }

  visitProject() {
    window.open(this.projectData.projectLink, '_blank');
  }

  goBack() {
    this.router.navigate(['/all-projects']);
  }
}
