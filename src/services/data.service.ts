import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  of,
  retry,
  shareReplay,
  tap,
  throwError,
  timeout,
} from 'rxjs';

import { GistData } from 'src/constants/gist-data.constant';

interface CachePayload<T> {
  version: number;
  timestamp: number;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // =========================================================
  // PORTFOLIO EXPERIENCE DATES
  // =========================================================

  joiningDate: string = '2021/02/15';

  currentCompanyJoiningDate: string = '2022/11/28';

  // =========================================================
  // BEHAVIOR SUBJECTS
  // =========================================================

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

  // =========================================================
  // CACHE CONFIGURATION
  // =========================================================

  /**
   * Increase this number whenever the structure of your
   * cached data changes and old cache should be ignored.
   */
  private readonly CACHE_VERSION = 1;

  /**
   * Cache remains fresh for 24 hours.
   */
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000;

  /**
   * Maximum time allowed for a Gist request.
   */
  private readonly GIST_TIMEOUT = 10_000;

  /**
   * Number of retry attempts after a temporary
   * request failure.
   */
  private readonly GIST_RETRY_COUNT = 1;

  // =========================================================
  // CACHE KEYS
  // =========================================================

  private readonly EXPERIENCE_CACHE_KEY = 'experience-data-v1';

  private readonly PROJECT_CACHE_KEY = 'project-data-v1';

  private readonly GENERAL_CACHE_KEY = 'general-data-v1';

  // =========================================================
  // ACTIVE REQUESTS
  // =========================================================

  /**
   * Prevent duplicate requests for the same Gist.
   */
  private experienceRequest$?: Observable<any>;

  private projectRequest$?: Observable<any>;

  private generalRequest$?: Observable<any>;

  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(private http: HttpClient) {
    /**
     * Subscribe before fetching because cached data
     * may be emitted synchronously.
     */
    this.calculateClientProjects();

    this.calculateMyOwnProjects();

    // Load portfolio data.
    this.fetchPortfolioExperienceData().subscribe();

    this.fetchPortfolioProjectsData().subscribe();

    this.fetchPortfolioGeneralData().subscribe();

    // Calculate experience.
    this.createTotalExp();

    this.createCurrentCompanyExperience();
  }

  // =========================================================
  // EXPERIENCE CALCULATIONS
  // =========================================================

  createTotalExp(): void {
    const today = new Date();

    const joining = new Date(this.joiningDate);

    const years = today.getFullYear() - joining.getFullYear();

    const months = today.getMonth() - joining.getMonth();

    this.totalExperience.next(years + Number((months / 12).toFixed(1)));
  }

  createCurrentCompanyExperience(): void {
    const today = new Date();

    const joining = new Date(this.currentCompanyJoiningDate);

    const years = today.getFullYear() - joining.getFullYear();

    const months = today.getMonth() - joining.getMonth();

    this.currentCompanyExperience.next(
      years + Number((months / 12).toFixed(1)),
    );
  }

  // =========================================================
  // PUBLIC DATA METHODS
  // =========================================================

  fetchPortfolioExperienceData(): Observable<any> {
    return this.getPortfolioData(
      GistData.experienceData,
      this.EXPERIENCE_CACHE_KEY,
      this.portfolioExperienceGistData,
      'Experience',
      this.validateExperienceData,
    );
  }

  fetchPortfolioProjectsData(): Observable<any> {
    return this.getPortfolioData(
      GistData.projectData,
      this.PROJECT_CACHE_KEY,
      this.portfolioProjectsGistData,
      'Projects',
      this.validateProjectData,
    );
  }

  fetchPortfolioGeneralData(): Observable<any> {
    return this.getPortfolioData(
      GistData.generalData,
      this.GENERAL_CACHE_KEY,
      this.portfolioGeneralGistData,
      'General',
      this.validateGeneralData,
    );
  }

  // =========================================================
  // GENERIC PORTFOLIO DATA HANDLER
  // =========================================================

  private getPortfolioData<T>(
    url: string,
    cacheKey: string,
    subject: BehaviorSubject<T>,
    label: string,
    validator: (data: T) => boolean,
  ): Observable<T> {
    // -------------------------------------------------------
    // 1. CHECK FRESH CACHE
    // -------------------------------------------------------

    const cached = this.getFromCache<T>(cacheKey);

    if (cached !== null && validator(cached)) {
      /**
       * Fresh cache:
       *
       * Display immediately.
       *
       * No Gist request.
       */
      subject.next(cached);

      return of(cached);
    }

    // -------------------------------------------------------
    // 2. CHECK STALE CACHE
    // -------------------------------------------------------

    const stale = this.getStaleCache<T>(cacheKey);

    const validStale = stale !== null && validator(stale) ? stale : null;

    /**
     * Display stale data immediately.
     *
     * Fresh data will be requested below.
     */
    if (validStale !== null) {
      subject.next(validStale);
    }

    // -------------------------------------------------------
    // 3. CHECK EXISTING REQUEST
    // -------------------------------------------------------

    const existingRequest = this.getExistingRequest(cacheKey);

    if (existingRequest) {
      return existingRequest;
    }

    // -------------------------------------------------------
    // 4. CREATE GIST REQUEST
    // -------------------------------------------------------

    const request$ = this.http.get<T>(url).pipe(
      /**
       * Prevent the request from hanging indefinitely.
       */
      timeout(this.GIST_TIMEOUT),

      /**
       * Retry once for temporary failures.
       */
      retry({
        count: this.GIST_RETRY_COUNT,
        delay: (error) => {
          return of(error);
        },
      }),

      /**
       * Validate response before it reaches
       * the cache.
       */
      tap((data: T) => {
        if (!validator(data)) {
          throw new Error(`${label} Gist returned invalid data`);
        }
      }),

      /**
       * Save only validated data.
       */
      tap((data: T) => {
        subject.next(data);

        this.saveToCache(cacheKey, data);
      }),

      /**
       * Handle all request/validation failures.
       */
      catchError((error) => {
        if (this.isProduction()) {
          console.error(`${label} Gist request failed`);
        } else {
          console.error(`${label} Gist request failed:`, error);
        }

        /**
         * Keep stale data if available.
         */
        if (validStale !== null) {
          return of(validStale);
        }

        /**
         * No valid cache available.
         */
        return of({} as T);
      }),

      /**
       * Clear active request reference after
       * completion/error.
       */
      finalize(() => {
        this.clearExistingRequest(cacheKey);
      }),

      /**
       * Share one HTTP request among
       * multiple subscribers.
       */
      shareReplay(1),
    );

    this.setExistingRequest(cacheKey, request$);

    return request$;
  }

  // =========================================================
  // RESPONSE VALIDATION
  // =========================================================

  /**
   * Experience Gist structure:
   *
   * {
   *   experience: [...]
   * }
   */
  private validateExperienceData(data: any): boolean {
    return (
      data !== null &&
      typeof data === 'object' &&
      !Array.isArray(data) &&
      Array.isArray(data.experience)
    );
  }

  /**
   * Projects Gist structure:
   *
   * {
   *   projectsData: [...]
   * }
   */
  private validateProjectData(data: any): boolean {
    return (
      data !== null &&
      typeof data === 'object' &&
      !Array.isArray(data) &&
      Array.isArray(data.projectsData)
    );
  }

  /**
   * General data is intentionally kept flexible.
   *
   * We only require a non-null JSON object.
   */
  private validateGeneralData(data: any): boolean {
    return data !== null && typeof data === 'object' && !Array.isArray(data);
  }

  // =========================================================
  // REQUEST MANAGEMENT
  // =========================================================

  private getExistingRequest(cacheKey: string): Observable<any> | undefined {
    switch (cacheKey) {
      case this.EXPERIENCE_CACHE_KEY:
        return this.experienceRequest$;

      case this.PROJECT_CACHE_KEY:
        return this.projectRequest$;

      case this.GENERAL_CACHE_KEY:
        return this.generalRequest$;

      default:
        return undefined;
    }
  }

  private setExistingRequest(
    cacheKey: string,
    request$: Observable<any>,
  ): void {
    switch (cacheKey) {
      case this.EXPERIENCE_CACHE_KEY:
        this.experienceRequest$ = request$;
        break;

      case this.PROJECT_CACHE_KEY:
        this.projectRequest$ = request$;
        break;

      case this.GENERAL_CACHE_KEY:
        this.generalRequest$ = request$;
        break;
    }
  }

  private clearExistingRequest(cacheKey: string): void {
    switch (cacheKey) {
      case this.EXPERIENCE_CACHE_KEY:
        this.experienceRequest$ = undefined;
        break;

      case this.PROJECT_CACHE_KEY:
        this.projectRequest$ = undefined;
        break;

      case this.GENERAL_CACHE_KEY:
        this.generalRequest$ = undefined;
        break;
    }
  }

  // =========================================================
  // CACHE - SAVE
  // =========================================================

  private saveToCache<T>(key: string, data: T): void {
    try {
      const payload: CachePayload<T> = {
        version: this.CACHE_VERSION,
        timestamp: Date.now(),
        data,
      };

      localStorage.setItem(key, JSON.stringify(payload));
    } catch (error) {
      if (this.isProduction()) {
        console.error(`Failed to save cache: ${key}`);
      } else {
        console.error(`Failed to save cache: ${key}`, error);
      }
    }
  }

  // =========================================================
  // CACHE - FRESH
  // =========================================================

  private getFromCache<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);

      if (!raw) {
        return null;
      }

      const payload: CachePayload<T> = JSON.parse(raw);

      /**
       * Ignore cache created by an older
       * cache structure/version.
       */
      if (payload.version !== this.CACHE_VERSION) {
        return null;
      }

      const expired = Date.now() - payload.timestamp > this.CACHE_TTL;

      if (expired) {
        return null;
      }

      return payload.data;
    } catch (error) {
      if (!this.isProduction()) {
        console.error(`Failed to read cache: ${key}`, error);
      }

      return null;
    }
  }

  // =========================================================
  // CACHE - STALE
  // =========================================================

  private getStaleCache<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);

      if (!raw) {
        return null;
      }

      const payload: CachePayload<T> = JSON.parse(raw);

      /**
       * Even stale data must belong to the
       * current cache version.
       */
      if (payload.version !== this.CACHE_VERSION) {
        return null;
      }

      return payload.data;
    } catch (error) {
      if (!this.isProduction()) {
        console.error(`Failed to read stale cache: ${key}`, error);
      }

      return null;
    }
  }

  // =========================================================
  // CACHE MANAGEMENT
  // =========================================================

  clearAllCache(): void {
    localStorage.removeItem(this.EXPERIENCE_CACHE_KEY);

    localStorage.removeItem(this.PROJECT_CACHE_KEY);

    localStorage.removeItem(this.GENERAL_CACHE_KEY);
  }

  // =========================================================
  // FORCE REFRESH
  // =========================================================

  forceRefresh(): void {
    /**
     * Clear existing cache.
     */
    this.clearAllCache();

    /**
     * Clear active request references.
     */
    this.experienceRequest$ = undefined;

    this.projectRequest$ = undefined;

    this.generalRequest$ = undefined;

    /**
     * Fetch fresh data.
     */
    this.fetchPortfolioExperienceData().subscribe();

    this.fetchPortfolioProjectsData().subscribe();

    this.fetchPortfolioGeneralData().subscribe();
  }

  // =========================================================
  // CLIENT PROJECT COUNT
  // =========================================================

  calculateClientProjects(): void {
    this.portfolioExperienceGistData.subscribe((value) => {
      let count = 0;

      const finalVal = value?.experience;

      if (finalVal) {
        finalVal.forEach((element: any) => {
          count += element?.products?.length || 0;
        });

        this.clientProjectCount.next(count);
      }
    });
  }

  // =========================================================
  // OWN PROJECT COUNT
  // =========================================================

  calculateMyOwnProjects(): void {
    this.portfolioProjectsGistData.subscribe((value) => {
      if (value?.projectsData) {
        this.myOwnProjectCount.next(value.projectsData.length);
      }
    });
  }

  // =========================================================
  // ENVIRONMENT CHECK
  // =========================================================

  private isProduction(): boolean {
    return false;
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
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
//     {},
//   );
//   portfolioProjectsGistData: BehaviorSubject<any> = new BehaviorSubject<any>(
//     {},
//   );
//   portfolioGeneralGistData: BehaviorSubject<any> = new BehaviorSubject<any>({});
//   private readonly EXPERIENCE_CACHE_KEY = 'experience-data-v1';
//   private readonly PROJECT_CACHE_KEY = 'project-data-v1';
//   private readonly GENERAL_CACHE_KEY = 'general-data-v1';
//   private readonly CACHE_TTL = 24 * 60 * 60 * 1000;

//   constructor(private http: HttpClient) {
//     this.fetchPortfolioExperienceData().subscribe();
//     this.fetchPortfolioProjectsData().subscribe();
//     this.fetchPortfolioGeneralData().subscribe();
//     this.createTotalExp();
//     this.createCurrentCompanyExperience();
//     this.calculateClientProjects();
//     this.calculateMyOwnProjects();
//   }

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
//       years + Number((months / 12).toFixed(1)),
//     );
//   }

//   fetchPortfolioExperienceData(): Observable<any> {
//     const cached = this.getFromCache(this.EXPERIENCE_CACHE_KEY);
//     if (cached) {
//       this.portfolioExperienceGistData.next(cached);
//       return of(cached);
//     }

//     return this.http.get<any>(GistData.experienceData).pipe(
//       tap((data: any) => {
//         this.portfolioExperienceGistData.next(data);
//         this.saveToCache(this.EXPERIENCE_CACHE_KEY, data);
//       }),
//       catchError((err) => {
//         this.portfolioExperienceGistData.next(
//           this.getStaleCache(this.EXPERIENCE_CACHE_KEY),
//         );
//         return of(this.getStaleCache(this.EXPERIENCE_CACHE_KEY));
//       }),
//     );
//   }

//   fetchPortfolioProjectsData(): Observable<any> {
//     const cached = this.getFromCache(this.PROJECT_CACHE_KEY);
//     if (cached) {
//       this.portfolioProjectsGistData.next(cached);
//       return of(cached);
//     }

//     return this.http.get<any>(GistData.projectData).pipe(
//       tap((data: any) => {
//         this.portfolioProjectsGistData.next(data);
//         this.saveToCache(this.PROJECT_CACHE_KEY, data);
//       }),
//       catchError((err) => {
//         this.portfolioProjectsGistData.next(
//           this.getStaleCache(this.PROJECT_CACHE_KEY),
//         );
//         return of(this.getStaleCache(this.PROJECT_CACHE_KEY));
//       }),
//     );
//   }

//   fetchPortfolioGeneralData(): Observable<any> {
//     const cached = this.getFromCache(this.GENERAL_CACHE_KEY);
//     if (cached) {
//       this.portfolioGeneralGistData.next(cached);
//       return of(cached);
//     }

//     return this.http.get<any>(GistData.generalData).pipe(
//       tap((data: any) => {
//         this.portfolioGeneralGistData.next(data);
//         this.saveToCache(this.GENERAL_CACHE_KEY, data);
//       }),
//       catchError((err) => {
//         this.portfolioGeneralGistData.next(
//           this.getStaleCache(this.GENERAL_CACHE_KEY),
//         );
//         return of(this.getStaleCache(this.GENERAL_CACHE_KEY));
//       }),
//     );
//   }

//   private saveToCache(key: string, data: any): void {
//     localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
//   }

//   private getFromCache(key: string): any | null {
//     const raw = localStorage.getItem(key);
//     if (!raw) return null;

//     try {
//       const payload = JSON.parse(raw);
//       const expired = Date.now() - payload.timestamp > this.CACHE_TTL;

//       if (expired) {
//         localStorage.removeItem(key);
//         return null;
//       }

//       return payload.data;
//     } catch {
//       localStorage.removeItem(key);
//       return null;
//     }
//   }

//   private getStaleCache(key: string): any | null {
//     const raw = localStorage.getItem(key);
//     if (!raw) return null;

//     try {
//       return JSON.parse(raw).data;
//     } catch {
//       return null;
//     }
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
