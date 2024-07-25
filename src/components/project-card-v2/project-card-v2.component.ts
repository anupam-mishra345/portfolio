import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projects } from 'src/constants/project.constant';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-project-card-v2',
  templateUrl: './project-card-v2.component.html',
  styleUrls: ['./project-card-v2.component.scss'],
})
export class ProjectCardV2Component {
  isDarkMode: boolean = false;
  projectData = Projects.projectsData;

  @Input() showText: boolean = false;
  @Input() arrowBtnName: string = '';
  @Input() project = {
    id: '',
    logo: '',
    projectScreenShot: '',
    projectMockup: '',
    projectName: '',
    projectLink: '',
    technologies: [''],
    technologies2: [{ name: '', logo: '' }],
    cardInfo: '',
    duration: '',
    year: 0,
    overview: [''],
    keyFeatures: [''],
  };

  @Output() navigateNewProject = new EventEmitter<string>();

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }

  navigateTo(id: string) {
    const url = '/project-details-v2/' + id;
    this.router.navigate([url]);
    if (this.showText) {
      this.navigateNewProject.emit(id);
    }
  }
  ngOnDestroy() {
    this.project = {
      id: '',
      logo: '',
      projectScreenShot: '',
      projectMockup: '',
      projectName: '',
      projectLink: '',
      technologies: [''],
      technologies2: [{ name: '', logo: '' }],
      cardInfo: '',
      duration: '',
      year: 0,
      overview: [''],
      keyFeatures: [''],
    };
  }
}
