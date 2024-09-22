import { Component } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/services/data.service';
@Component({
  selector: 'app-about-me-v3',
  templateUrl: './about-me-v3.component.html',
  styleUrls: ['./about-me-v3.component.scss'],
})
export class AboutMeV3Component {
  isDarkMode: boolean = false;
  totalExperience: number = 0;
  currentCompanyExperience: number = 0;

  experience: any = [];

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
    this.experience = [
      {
        industry: 'Kanishka IT Pvt Ltd',
        position: 'TECHNICAL TRAINER',
        duration: 'December 2017 - July 2018',
        work: 'During my 8-month tenure as a technical trainer, I successfully designed and delivered comprehensive training programs on web development technologies. I facilitated both theoretical and hands-on sessions, tailored to various skill levels, ensuring participants gained practical experience and a deep understanding of the material. My role also involved creating detailed training materials, conducting assessments, and providing personalized feedback to help learners achieve their technical goals.',
      },
      {
        industry: 'Ajapro AI Technologies',
        position: 'FULLSTACK DEVELOPER',
        duration: 'Febuary 2021 - November 2022',
        work: "With almost 2 years as a Full Stack developer, I've mastered front-end and back-end development through diverse projects like Interview IA & TrustyX. I built web user interfaces, fixed bugs across the product codebase, updated old codebases, and integrated third-party tools. As part of the Fast-Sprint Team, I delivered new features and integrations swiftly. Additionally, I developed and maintained Node.js server-side applications, focusing on high-performance RESTful APIs, integrated web2 with blockchain technology using Tatum.js, and mentored junior team members.",
        products: [
          { name: 'INTERVIEW IA', duration: 'Feb 2021 - Dec 2021' },
          { name: 'TRUSTYX', duration: 'Jan 2022 - Nov 2022' },
        ],
      },
      {
        industry: 'Mantra Labs',
        position: 'SOFTWARE ENGINEER',
        duration: 'November 2022 - Present',
        work: `With ${this.currentCompanyExperience} years as a software engineer, I have developed and enhanced various applications. I integrated Firebase for real-time notifications, designed user role-based applications, managed RESTful API integration, and utilized Formik and Yup for form validation. I set up front-end codebases following best practices, keeping enhanced security with Interceptors and AuthGuard in mind, completed user onboarding flows, and mentored new team members. Leveraging my React experience, I enhanced functionality and added features to many projects. Additionally, I improved existing projects by adding features, resolving bugs, and reprogramming functionalities for better efficiency.`,
        products: [
          { name: 'CANERA HSBC', duration: 'Dec 2022 - Jun 2023' },
          { name: 'MILES EDUCATION', duration: 'Jun 2023 - Nov 2023' },
          { name: 'MANIPAL HOSPITALS', duration: 'Dec 2023 - Jul 2024' },
          { name: 'TATA AIA', duration: 'Apr 2024 - May 2024' },
          { name: 'Mantra TraQ', duration: 'Aug 2024 - Present' },
        ],
      },
    ];
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
}
