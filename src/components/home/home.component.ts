import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    scrollTo(0, 0);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
