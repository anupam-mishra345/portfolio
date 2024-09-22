import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  joiningDate: string = '2021/02/15';
  currentCompanyJoiningDate: string = '2022/11/28';
  totalExperience: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentCompanyExperience: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  createTotalExp() {
    const today = new Date();
    const joining = new Date(this.joiningDate);

    let years = today.getFullYear() - joining.getFullYear();
    let months = today.getMonth() - joining.getMonth();

    this.totalExperience.next(years + Number((months / 12).toFixed(1)));
  }

  createCurrentCompanyExperience() {
    const today = new Date();
    const joining = new Date(this.currentCompanyJoiningDate);

    let years = today.getFullYear() - joining.getFullYear();
    let months = today.getMonth() - joining.getMonth();

    this.currentCompanyExperience.next(
      years + Number((months / 12).toFixed(1))
    );
  }

  constructor() {
    this.createTotalExp();
    this.createCurrentCompanyExperience();
  }
}
