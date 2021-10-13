import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  tryLogin(username: string, password: string): Observable<void> {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    const url = environment.apiUrl + `/login`;
    
    return this.http.get<void>(url);
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    this.router.navigate(['/login']);
  }

  checkIfCredentialsStored(): boolean {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    return !!username && !!password;
  }

  getStoredCredentials(): { username: string; password: string } {
    const username = localStorage.getItem('username') || '';
    const password = localStorage.getItem('password') || '';
    
    return {
      username,
      password,
    };
  }
}
