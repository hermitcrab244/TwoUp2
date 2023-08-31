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

  endGame(user_ID: number, username: string, score: number) {
    const body = { user_ID, username, score };
    return this.http.post(`${this.apiURL}/end`, body);
  }

  leaderboard(): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}/retrieve-scores`);
  }

  colourUpdate(colour_pref: string, user_ID: number): Observable<any> {
    const body = { colour_pref, user_ID };
    return this.http.post(`${this.apiURL}/colour-update`, body);
  }

  userHighScore(username: string): Observable<any> {
    return this.http.get(`${this.apiURL}/user-highest-score`, {
      params: {
        username: username,
      },
    });
  }
}
