import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/services/email.service';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
})
export class ContactUsFormComponent {
  form!: FormGroup;

  isDarkMode: boolean = false;
  @Output() cancelForm = new EventEmitter();

  constructor(
    private themeService: ThemeService,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}$')],
      ],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }
  cancelHandler() {
    this.cancelForm.emit();
  }
  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      this.sendContactEmail();
    } else {
      console.log('Form is invalid');
    }
  }

  sendContactEmail() {
    this.emailService
      .sendEmail(
        'anupam.mishra3451@gmail.com',
        'Portfolio Query',
        this.emailTemplateUI()
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
  }

  emailTemplateUI() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px 0 0 0; background-color: #f4f4f4;">

      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #4caf50; padding: 15px; text-align: center; color: #ffffff; font-size: 24px;">
          New Message Received
        </div>
        
        <!-- Content -->
        <div style="padding: 20px; color: #333333;font-size: 14px">
          <p style="margin: 8px 0;">
            <span style="font-weight: bold; color: #555555;">Name:</span>
            <span style="color: #333333;">${this.form.value.firstName} ${this.form.value.lastName}</span>
          </p>
          <p style="margin: 8px 0;">
            <span style="font-weight: bold; color: #555555;">Email:</span>
            <span style="color: #333333;">${this.form.value.email}</span>
          </p>
          <p style="margin: 8px 0;">
            <span style="font-weight: bold; color: #555555;">Mobile Number:</span>
            <span style="color: #333333;">${this.form.value.mobile}</span>
          </p>
          <p style="margin: 8px 0;">
            <span style="font-weight: bold; color: #555555;">Message:</span>
          </p>
          <p style="color: #333333;">${this.form.value.message}</p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777777;">
          This is an automated email. Please do not reply.
        </div>
        
      </div>

    </body>
    </html>

    `;
  }
}
