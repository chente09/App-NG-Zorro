import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://api.brevo.com/v3/smtp/email';
  // private apiKey = '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';
  private apiKey = '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';

  constructor(private http: HttpClient) {}

  sendEmail(email: string, name: string, htmlContent: string, subject: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': this.apiKey,
    });

    const emailData = {
      sender: {
        name: 'Vicente',
        email: 'chentenegernc@outlook.com',
      },
      to: [
        {
          email,
          name,
        },
      ],
      htmlContent,
      subject,
    };

    return this.http.post(this.apiUrl, emailData, { headers });
  }
}
