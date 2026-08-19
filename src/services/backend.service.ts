import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BackendResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private readonly apiUrl = 'https://backend-psi-eight-22.vercel.app/api';

  constructor(private http: HttpClient) {}

  testBackend(): Observable<BackendResponse> {
    return this.http.get<BackendResponse>(`${this.apiUrl}/hello`);
  }
}
