import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';

import { ResumeService } from 'src/services/resume.service';
import { ThemeService } from 'src/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume-viewer',
  templateUrl: './resume-viewer.component.html',
  styleUrls: ['./resume-viewer.component.scss'],
})
export class ResumeViewerComponent implements OnDestroy {
  @Output() closed = new EventEmitter<void>();

  pdfUrl: string | null = null;

  loading = true;

  error = false;

  isDarkMode = false;

  private themeSubscription?: Subscription;

  constructor(
    private resumeService: ResumeService,
    private themeService: ThemeService,
  ) {
    this.subscribeToTheme();

    this.lockBodyScroll();

    this.loadResume();
  }

  /**
   * Subscribe to the same ThemeService
   * used by the portfolio.
   */
  private subscribeToTheme(): void {
    this.themeSubscription = this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }

  /**
   * Load resume from ResumeService.
   *
   * ResumeService decides whether to use
   * cache or call the backend.
   */
  private loadResume(): void {
    this.loading = true;
    this.error = false;

    this.resumeService.getResume().subscribe({
      next: (blob: Blob) => {
        this.revokePdfUrl();

        this.pdfUrl = URL.createObjectURL(blob);

        this.loading = false;

        console.log('Resume ready for viewer');
      },

      error: (error) => {
        console.error('Unable to load resume', error);

        this.loading = false;
        this.error = true;
      },
    });
  }

  /**
   * Close viewer.
   */
  close(): void {
    this.closed.emit();
  }

  /**
   * Close when ESC is pressed.
   */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  /**
   * Prevent modal click from closing
   * the viewer.
   */
  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  /**
   * Prevent background page scrolling.
   */
  private lockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  /**
   * Restore background page scrolling.
   */
  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  /**
   * Release Blob URL.
   */
  private revokePdfUrl(): void {
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl);

      this.pdfUrl = null;
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();

    this.revokePdfUrl();

    this.unlockBodyScroll();
  }
}
