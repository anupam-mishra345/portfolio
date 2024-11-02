import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';

  apiKey = environment.apiKey;

  async sendEmail(
    toEmail: string,
    subject: string,
    content: string
  ): Promise<any> {
    const emailData = {
      sender: { email: 'anupam.mishra345@gmail.com' },
      to: [{ email: toEmail }],
      subject: subject,
      htmlContent: content,
    };

    try {
      const response = await axios.post(this.brevoApiUrl, emailData, {
        headers: { 'api-key': this.apiKey, 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
