import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-testimonials-v2',
  templateUrl: './testimonials-v2.component.html',
  styleUrls: ['./testimonials-v2.component.scss'],
})
export class TestimonialsV2Component {
  isDarkMode: boolean = false;
  remarks: string[] = [
    "Anupam's expertise in front-end technologies and commitment to enhancing our codebase have greatly improved the quality of our project. Great work, Anupam!",
    "How Anupam contributed to our project has been impressive. His remarkable skill in seamlessly integrating new features along with his mentorship and guidance for our junior developers, has played a pivotal role in the team's growth. Keep up the amazing work, Anupam!",
    "Anupam's proficiency in multiple programming languages is impressive. He can switch between languages effortlessly, making him a versatile and invaluable team member. Outstanding job, Anupam!",
    'Working with Anupam has been a game-changer for our project. He quickly adapted to new technologies. Keep pushing the envelop, Anupam!',
    'Giving Anupam a chance to start a career with us in a startup will always be one of the good bets. I won with you, man!',
  ];

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }
}
