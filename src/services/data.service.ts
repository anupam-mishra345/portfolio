import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GistData } from 'src/constants/gist-data.constant';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  joiningDate: string = '2021/02/15';
  currentCompanyJoiningDate: string = '2022/11/28';
  totalExperience: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  clientProjectCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  myOwnProjectCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentCompanyExperience: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  portfolioExperienceGistData: BehaviorSubject<any> = new BehaviorSubject<any>(
    {}
  );
  portfolioProjectsGistData: BehaviorSubject<any> = new BehaviorSubject<any>(
    {}
  );
  portfolioGeneralGistData: BehaviorSubject<any> = new BehaviorSubject<any>({});

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

  constructor(private http: HttpClient) {
    this.fetchPortfolioExperienceData();
    this.fetchPortfolioProjectsData();
    this.fetchPortfolioGeneralData();
    this.createTotalExp();
    this.createCurrentCompanyExperience();
    this.calculateClientProjects();
    this.calculateMyOwnProjects();
  }

  fetchPortfolioExperienceData() {
    const gistApiUrl = GistData.portfolioExperienceGistUrl;

    this.http.get<any>(gistApiUrl).subscribe({
      next: (res) => {
        const fileContent = res.files['portfolio-experience-data.json'].content;
        this.portfolioExperienceGistData.next(JSON.parse(fileContent));
      },
      error: (err) => console.error('Error fetching gist data:', err),
    });
  }

  fetchPortfolioProjectsData() {
    const gistApiUrl = GistData.portfolioProjectsGistUrl;

    this.http.get<any>(gistApiUrl).subscribe({
      next: (res) => {
        const fileContent = res.files['portfolio-projects-data.json'].content;
        this.portfolioProjectsGistData.next(JSON.parse(fileContent));
      },
      error: (err) => console.error('Error fetching gist data:', err),
    });
  }

  fetchPortfolioGeneralData() {
    const gistApiUrl = GistData.portfolioGeneralGistUrl;

    this.http.get<any>(gistApiUrl).subscribe({
      next: (res) => {
        const fileContent = res.files['portfolio-general-data.json'].content;
        this.portfolioGeneralGistData.next(JSON.parse(fileContent));
      },
      error: (err) => console.error('Error fetching gist data:', err),
    });
  }

  calculateClientProjects() {
    this.portfolioExperienceGistData?.subscribe((value) => {
      let count = 0;
      let finalVal = value.experience;
      if (finalVal) {
        finalVal.forEach((element: any) => {
          count += element?.products ? element?.products?.length : 0;
        });
        this.clientProjectCount.next(count);
      }
    });
  }

  calculateMyOwnProjects() {
    this.portfolioProjectsGistData?.subscribe((value) => {
      if (value.projectsData) {
        this.myOwnProjectCount.next(value?.projectsData.length);
      }
    });
  }
}
