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
    "How Anupam contributed to our project has been impressive. His seamless feature integration and mentorship of junior developers have been key to the team's growth. Keep up the amazing work, Anupam!",
    "Anupam's proficiency in multiple programming languages is impressive. He can switch between languages effortlessly, making him a versatile and invaluable team member. Outstanding job, Anupam!",
    'Working with Anupam has been a game-changer for our project. He quickly adapted to new technologies. Keep pushing the envelop, Anupam!',
    'Hiring Anupam to start his career with us at the startup was one of the best bets. His dedication, hard work, and talent have exceeded expectations. I truly feel like I won with you, man!',
  ];

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
    scrollTo(0, 0);
  }
}
