import { Component } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-about-me-v3',
  templateUrl: './about-me-v3.component.html',
  styleUrls: ['./about-me-v3.component.scss'],
})
export class AboutMeV3Component {
  isDarkMode: boolean = false;

  experience = [
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
      products: ['INTERVIEW IA', 'TRUSTYX'],
    },
    {
      industry: 'Mantra Labs',
      position: 'SOFTWARE ENGINEER',
      duration: 'November 2022 - Present',
      work: 'With 1.5 years as a software engineer, I have developed and enhanced various applications. I integrated Firebase for real-time notifications, designed user role-based applications, managed RESTful API integration, and utilized Formik and Yup for form validation. I set up front-end codebases following best practices, keeping enhanced security with Interceptors and AuthGuard in mind, completed user onboarding flows, and mentored new team members. Leveraging my React experience, I enhanced functionality and added features to internal projects.',
      products: [
        'MILES EDUCATION',
        'MANIPAL HOSPITALS',
        'CANERA HSBC',
        'TATA AIA',
      ],
    },
  ];

  awards = [
    {
      name: 'Employee of the Month',
      category: 'Awards',
      month: 'October 2023',
    },
    {
      name: 'Performer of the Month',
      category: 'Awards',
      month: 'December 2021',
    },
    {
      name: 'Full stack Development',
      category: 'Course',
      month: 'July 2020',
    },
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }
}
