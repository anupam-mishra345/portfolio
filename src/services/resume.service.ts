import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private readonly resumeApiUrl =
    'https://backend-psi-eight-22.vercel.app/api/resume';

  private readonly RESUME_CACHE_KEY = 'portfolio_resume_pdf';

  private readonly RESUME_CACHE_TIME_KEY = 'portfolio_resume_pdf_timestamp';

  private readonly RESUME_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  constructor(private http: HttpClient) {}

  /**
   * Returns the resume PDF.
   *
   * Uses localStorage cache if it is still valid.
   * Fetches a fresh copy from the backend after 1 hour.
   */
  getResume(): Observable<Blob> {
    const cachedResume = this.getCachedResume();

    if (cachedResume) {
      console.log('Resume loaded from cache');

      return of(cachedResume);
    }

    console.log('Fetching latest resume from API...');

    return this.http
      .get(this.resumeApiUrl, {
        responseType: 'blob',
      })
      .pipe(
        tap((blob: Blob) => {
          console.log('Resume fetched successfully');
          console.log('File type:', blob.type);
          console.log('File size:', blob.size);

          this.cacheResume(blob);
        }),
      );
  }

  /**
   * Get valid resume from localStorage.
   */
  private getCachedResume(): Blob | null {
    const cachedData = localStorage.getItem(this.RESUME_CACHE_KEY);

    const cachedTimestamp = localStorage.getItem(this.RESUME_CACHE_TIME_KEY);

    if (!cachedData || !cachedTimestamp) {
      return null;
    }

    const cacheAge = Date.now() - Number(cachedTimestamp);

    if (cacheAge >= this.RESUME_CACHE_DURATION) {
      console.log('Resume cache expired');

      this.clearResumeCache();

      return null;
    }

    try {
      return this.dataUrlToBlob(cachedData);
    } catch (error) {
      console.error('Invalid cached resume', error);

      this.clearResumeCache();

      return null;
    }
  }

  /**
   * Store PDF in localStorage.
   */
  private cacheResume(blob: Blob): void {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        localStorage.setItem(this.RESUME_CACHE_KEY, reader.result as string);

        localStorage.setItem(this.RESUME_CACHE_TIME_KEY, Date.now().toString());

        console.log('Resume cached successfully');
      } catch (error) {
        console.error('Unable to cache resume', error);
      }
    };

    reader.readAsDataURL(blob);
  }

  /**
   * Convert cached Base64 Data URL back to Blob.
   */
  private dataUrlToBlob(dataUrl: string): Blob {
    const [header, base64] = dataUrl.split(',');

    const mimeMatch = header.match(/data:(.*?);base64/);

    const mimeType = mimeMatch?.[1] || 'application/pdf';

    const byteCharacters = atob(base64);

    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray.buffer], {
      type: mimeType,
    });
  }

  /**
   * Clear cached resume.
   */
  clearResumeCache(): void {
    localStorage.removeItem(this.RESUME_CACHE_KEY);

    localStorage.removeItem(this.RESUME_CACHE_TIME_KEY);

    console.log('Resume cache cleared');
  }
}
