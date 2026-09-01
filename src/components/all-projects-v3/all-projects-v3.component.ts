import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-all-projects-v3',
  templateUrl: './all-projects-v3.component.html',
  styleUrls: ['./all-projects-v3.component.scss'],
})
export class AllProjectsV3Component {
  isDarkMode: boolean = false;
  projectData: any = [];
  experience: any;
  currentCompanyExperience: number = 0;
  openProjectId: string = '';
  @ViewChild('projectWeb') projectWeb!: ElementRef;
  @ViewChild('projectWrapper') projectWrapper!: ElementRef;

  constructor(
    private themeService: ThemeService,
    private dataService: DataService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.projectWeb.nativeElement.classList.add('animate');
        } else {
          this.projectWeb.nativeElement.classList.remove('animate');
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(this.projectWrapper.nativeElement);
  }

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    this.dataService.portfolioProjectsGistData.subscribe((value) => {
      this.projectData = value.projectsData;
    });
    this.dataService.currentCompanyExperience.subscribe((value) => {
      this.currentCompanyExperience = value;
    });
    this.dataService.portfolioExperienceGistData.subscribe((value) => {
      let temp: any = value.experience;
      if (temp && temp.length > 0)
        this.experience = temp.filter((exp: any) => exp?.products?.length > 0);
    });
    scrollTo(0, 0);
  }
  navigateTo(id: string) {
    const url = '/project-details/' + id;
    this.router.navigate([url]);
  }
  openProjectDetails(id: string) {
    if (this.openProjectId === id) {
      this.openProjectId = '';
    } else {
      this.openProjectId = id;
    }
  }
}
