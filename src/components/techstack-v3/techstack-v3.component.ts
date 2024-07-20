import { Component } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-techstack-v3',
  templateUrl: './techstack-v3.component.html',
  styleUrls: ['./techstack-v3.component.scss'],
})
export class TechstackV3Component {
  isDarkMode: boolean = false;
  techstacks = [
    {
      name: 'Angular',
      logo: './assets/StackLogo/Angular.png',
      info: 'Robust Web Applications',
      description:
        "Angular is my robust web application framework. I use it to create scalable, maintainable, and high-performance applications with a strong emphasis on structure and modularity. Angular's comprehensive ecosystem facilitates efficient development and seamless integration of complex functionalities, ensuring a smooth user experience.",
    },
    {
      name: 'React',
      logo: './assets/StackLogo/React.png',
      info: 'Dynamic Development',
      description:
        "React is my dynamic web development framework. I apply it to build interactive web applications with rich user interfaces. It's instrumental in creating engaging, responsive, and data-driven web experiences.",
    },
    {
      name: 'JavaScript',
      logo: './assets/StackLogo/Javascript.png',
      info: 'Versatile Programming',
      description:
        'JavaScript is my versatile programming language for web development. I leverage it to bring interactivity, functionality, and dynamism to web pages. With JavaScript, I can manipulate the DOM, handle events, and integrate various APIs, making it a cornerstone for building responsive and engaging web applications.',
    },
    {
      name: 'TypeScript',
      logo: './assets/StackLogo/Typescript.png',
      info: 'Strong Typing and Advanced Features',
      description:
        "TypeScript is my choice for strong typing and advanced features in JavaScript development. I use it to enhance code quality and maintainability by providing type safety and modern ECMAScript features. TypeScript's robust tooling and compile-time error checking streamline the development process, making large-scale applications easier to manage.",
    },
    {
      name: 'HTML & CSS',
      logo: './assets/StackLogo/Html.png',
      info: 'Foundation of Web Development',
      description:
        'HTML and CSS are the foundational technologies for web development. I use HTML to structure content and CSS to style and layout web pages. Together, they enable me to create visually appealing and well-structured web applications that are both user-friendly and responsive.',
    },
    {
      name: 'Tailwind',
      logo: './assets/StackLogo/Tailwind.png',
      info: 'Utility-First CSS Framework',
      description:
        "Tailwind is my utility-first CSS framework for designing custom user interfaces. I use it to rapidly build responsive and highly customizable components without writing custom CSS. Tailwind's utility classes allow me to style elements directly in the markup, promoting a clean and efficient workflow that enhances both productivity and design consistency.",
    },
    {
      name: 'Node.js',
      logo: './assets/StackLogo/Node.png',
      info: 'Server-Side Development',
      description:
        'Node.js is my preferred runtime for server-side development. I utilize it to build fast, scalable, and efficient server-side applications. With its non-blocking, event-driven architecture, Node.js excels in handling concurrent connections, making it ideal for real-time applications and APIs.',
    },
    {
      name: 'RESTful API',
      logo: './assets/StackLogo/API.png',
      info: 'Efficient Communication',
      description:
        'RESTful APIs are my standard for efficient communication between client and server. I design and implement RESTful APIs to enable seamless data exchange and interaction between different parts of an application. REST principles ensure that my APIs are scalable, stateless, and easy to use.',
    },
    {
      name: 'MySQL',
      logo: './assets/StackLogo/Mysql.png',
      info: 'Reliable Relational Database',
      description:
        "MySQL is my go-to relational database management system. I use it to manage and organize data in a structured way, ensuring data integrity and reliability. MySQL's performance and scalability make it a suitable choice for handling large datasets and complex queries.",
    },
    {
      name: 'PostgreSQL',
      logo: './assets/StackLogo/Postgres.png',
      info: 'Advanced Relational Database',
      description:
        "PostgreSQL is my choice for advanced relational database solutions. I apply it to leverage its powerful features, such as support for advanced data types, full-text search, and custom functions. PostgreSQL's robustness and extensibility make it ideal for complex applications requiring sophisticated data operations.",
    },
    {
      name: 'Git',
      logo: './assets/StackLogo/Git.png',
      info: 'Version Control',
      description:
        "Git is my essential tool for version control. I use it to track changes, collaborate with team members, and manage codebases efficiently. Git's branching and merging capabilities allow for smooth collaboration and ensure the integrity and history of the project's code.",
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
