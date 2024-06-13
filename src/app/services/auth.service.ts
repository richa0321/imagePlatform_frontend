import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://imageplatform-backend.onrender.com'; // backend URL
  // private apiUrl = 'http://localhost:3000'; // Your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
