import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  async sendEmail(e: Event): Promise<any> {
    e.preventDefault();
    try {
      emailjs
        .sendForm(
          enviroment.emailServiceId,
          enviroment.emailTemplateId,
          e.target as HTMLFormElement,
          enviroment.emailUserId
        )
        .then(
          (resp) => {
            return resp;
          },
          (error) => {
            throw error;
          }
        );
    } catch (error) {
      throw error;
    }
  }
}
