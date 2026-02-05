import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
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
    {},
  );
  portfolioProjectsGistData: BehaviorSubject<any> = new BehaviorSubject<any>(
    {},
  );
  portfolioGeneralGistData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private readonly EXPERIENCE_CACHE_KEY = 'experience-data-v1';
  private readonly PROJECT_CACHE_KEY = 'project-data-v1';
  private readonly GENERAL_CACHE_KEY = 'general-data-v1';
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000;

  constructor(private http: HttpClient) {
    this.fetchPortfolioExperienceData().subscribe();
    this.fetchPortfolioProjectsData().subscribe();
    this.fetchPortfolioGeneralData().subscribe();
    this.createTotalExp();
    this.createCurrentCompanyExperience();
    this.calculateClientProjects();
    this.calculateMyOwnProjects();
  }

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
      years + Number((months / 12).toFixed(1)),
    );
  }

  fetchPortfolioExperienceData(): Observable<any> {
    const cached = this.getFromCache(this.EXPERIENCE_CACHE_KEY);
    if (cached) {
      this.portfolioExperienceGistData.next(cached);
      return of(cached);
    }

    return this.http.get<any>(GistData.experienceData).pipe(
      tap((data: any) => {
        this.portfolioExperienceGistData.next(data);
        this.saveToCache(this.EXPERIENCE_CACHE_KEY, data);
      }),
      catchError((err) => {
        this.portfolioExperienceGistData.next(
          this.getStaleCache(this.EXPERIENCE_CACHE_KEY),
        );
        return of(this.getStaleCache(this.EXPERIENCE_CACHE_KEY));
      }),
    );
  }

  fetchPortfolioProjectsData(): Observable<any> {
    const cached = this.getFromCache(this.PROJECT_CACHE_KEY);
    if (cached) {
      this.portfolioProjectsGistData.next(cached);
      return of(cached);
    }

    return this.http.get<any>(GistData.projectData).pipe(
      tap((data: any) => {
        this.portfolioProjectsGistData.next(data);
        this.saveToCache(this.PROJECT_CACHE_KEY, data);
      }),
      catchError((err) => {
        this.portfolioProjectsGistData.next(
          this.getStaleCache(this.PROJECT_CACHE_KEY),
        );
        return of(this.getStaleCache(this.PROJECT_CACHE_KEY));
      }),
    );
  }

  fetchPortfolioGeneralData(): Observable<any> {
    const cached = this.getFromCache(this.GENERAL_CACHE_KEY);
    if (cached) {
      this.portfolioGeneralGistData.next(cached);
      return of(cached);
    }

    return this.http.get<any>(GistData.generalData).pipe(
      tap((data: any) => {
        this.portfolioGeneralGistData.next(data);
        this.saveToCache(this.GENERAL_CACHE_KEY, data);
      }),
      catchError((err) => {
        this.portfolioGeneralGistData.next(
          this.getStaleCache(this.GENERAL_CACHE_KEY),
        );
        return of(this.getStaleCache(this.GENERAL_CACHE_KEY));
      }),
    );
  }

  private saveToCache(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  }

  private getFromCache(key: string): any | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      const payload = JSON.parse(raw);
      const expired = Date.now() - payload.timestamp > this.CACHE_TTL;

      if (expired) {
        localStorage.removeItem(key);
        return null;
      }

      return payload.data;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }

  private getStaleCache(key: string): any | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw).data;
    } catch {
      return null;
    }
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

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { GistData } from 'src/constants/gist-data.constant';

// @Injectable({
//   providedIn: 'root',
// })
// export class DataService {
//   joiningDate: string = '2021/02/15';
//   currentCompanyJoiningDate: string = '2022/11/28';
//   totalExperience: BehaviorSubject<number> = new BehaviorSubject<number>(0);
//   clientProjectCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
//   myOwnProjectCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
//   currentCompanyExperience: BehaviorSubject<number> =
//     new BehaviorSubject<number>(0);
//   portfolioExperienceGistData: BehaviorSubject<any> = new BehaviorSubject<any>(
//     {}
//   );
//   portfolioProjectsGistData: BehaviorSubject<any> = new BehaviorSubject<any>(
//     {}
//   );
//   portfolioGeneralGistData: BehaviorSubject<any> = new BehaviorSubject<any>({});

//   createTotalExp() {
//     const today = new Date();
//     const joining = new Date(this.joiningDate);

//     let years = today.getFullYear() - joining.getFullYear();
//     let months = today.getMonth() - joining.getMonth();

//     this.totalExperience.next(years + Number((months / 12).toFixed(1)));
//   }

//   createCurrentCompanyExperience() {
//     const today = new Date();
//     const joining = new Date(this.currentCompanyJoiningDate);

//     let years = today.getFullYear() - joining.getFullYear();
//     let months = today.getMonth() - joining.getMonth();

//     this.currentCompanyExperience.next(
//       years + Number((months / 12).toFixed(1))
//     );
//   }

//   constructor(private http: HttpClient) {
//     this.fetchPortfolioExperienceData();
//     this.fetchPortfolioProjectsData();
//     this.fetchPortfolioGeneralData();
//     this.createTotalExp();
//     this.createCurrentCompanyExperience();
//     this.calculateClientProjects();
//     this.calculateMyOwnProjects();
//   }

//   fetchPortfolioExperienceData() {
//     const gistApiUrl = GistData.portfolioExperienceGistUrl;

//     this.http.get<any>(gistApiUrl).subscribe({
//       next: (res) => {
//         const fileContent = res.files['portfolio-experience-data.json'].content;
//         this.portfolioExperienceGistData.next(JSON.parse(fileContent));
//       },
//       error: (err) => console.error('Error fetching gist data:', err),
//     });
//   }

//   fetchPortfolioProjectsData() {
//     const gistApiUrl = GistData.portfolioProjectsGistUrl;

//     this.http.get<any>(gistApiUrl).subscribe({
//       next: (res) => {
//         const fileContent = res.files['portfolio-projects-data.json'].content;
//         this.portfolioProjectsGistData.next(JSON.parse(fileContent));
//       },
//       error: (err) => console.error('Error fetching gist data:', err),
//     });
//   }

//   fetchPortfolioGeneralData() {
//     const gistApiUrl = GistData.portfolioGeneralGistUrl;

//     this.http.get<any>(gistApiUrl).subscribe({
//       next: (res) => {
//         const fileContent = res.files['portfolio-general-data.json'].content;
//         this.portfolioGeneralGistData.next(JSON.parse(fileContent));
//       },
//       error: (err) => console.error('Error fetching gist data:', err),
//     });
//   }

//   calculateClientProjects() {
//     this.portfolioExperienceGistData?.subscribe((value) => {
//       let count = 0;
//       let finalVal = value.experience;
//       if (finalVal) {
//         finalVal.forEach((element: any) => {
//           count += element?.products ? element?.products?.length : 0;
//         });
//         this.clientProjectCount.next(count);
//       }
//     });
//   }

//   calculateMyOwnProjects() {
//     this.portfolioProjectsGistData?.subscribe((value) => {
//       if (value.projectsData) {
//         this.myOwnProjectCount.next(value?.projectsData.length);
//       }
//     });
//   }
// }
