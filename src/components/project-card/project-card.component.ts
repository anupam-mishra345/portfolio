import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() projectData: any = {};
  isDivHovered: boolean = false;
  isDarkMode: boolean = false;

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }

  navigateTo() {
    const url = '/project-details/' + this.projectData.id;
    this.router.navigateByUrl(url);
  }

  onHover(val: boolean) {
    this.isDivHovered = val;
  }
}
