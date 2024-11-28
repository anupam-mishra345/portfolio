import { Component } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/services/data.service';
import { Experience } from 'src/constants/experience.constant';
@Component({
  selector: 'app-about-me-v3',
  templateUrl: './about-me-v3.component.html',
  styleUrls: ['./about-me-v3.component.scss'],
})
export class AboutMeV3Component {
  isDarkMode: boolean = false;
  totalExperience: number = 0;
  currentCompanyExperience: number = 0;
  openProjectId: string = '';
  experience: any = Experience.experience.reverse();

  awards = [
    {
      name: 'Employee of the Month',
      category: 'Award',
      month: 'October 2023',
    },
    {
      name: 'Performer of the Month',
      category: 'Award',
      month: 'December 2021',
    },
    {
      name: 'Full stack Development',
      category: 'Certificate',
      month: 'July 2020',
    },
  ];

  constructor(
    private themeService: ThemeService,
    private http: HttpClient,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
    this.dataService.totalExperience.subscribe((value) => {
      this.totalExperience = value;
    });
    this.dataService.currentCompanyExperience.subscribe((value) => {
      this.currentCompanyExperience = value;
    });
    this.getExperience();
  }

  getExperience() {
    // this.experience =
  }

  downloadResume() {
    const filePath = './assets/pdfs/Anupam-Mishra-Resume.pdf';

    this.http
      .get(filePath, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Anupam Mishra Resume.pdf';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }

  openProjectDetails(id: string) {
    if (this.openProjectId === id) {
      this.openProjectId = '';
    } else {
      this.openProjectId = id;
    }
  }
}
