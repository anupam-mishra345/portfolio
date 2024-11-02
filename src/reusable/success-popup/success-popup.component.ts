import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss'],
  animations: [
    trigger('popupAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.2)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'scale(0.2)' })
        ),
      ]),
    ]),
  ],
})
export class SuccessPopupComponent {
  @Input() message: string = 'Success!';
  @Input() isSuccess: boolean = true;
  show: boolean = false;
  time: number = 3;

  showPopup() {
    this.show = true;
    this.showTimerhandler();
    setTimeout(() => {
      this.show = false;
      this.time = 3;
    }, 3500);
  }

  showTimerhandler() {
    setTimeout(() => {
      this.time -= 1;
      if (this.time > 0) {
        this.showTimerhandler();
      }
    }, 1000);
  }
}
