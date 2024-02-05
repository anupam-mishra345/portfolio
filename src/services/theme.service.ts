import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  setTheme(val: boolean) {
    this.isDarkMode.next(val);
  }
  getTheme() {
    return this.isDarkMode.asObservable();
  }
  constructor() {}
}
