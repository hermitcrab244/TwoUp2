import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiURL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiURL}/registration`, body);
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiURL}/login`, body);
  }
}
