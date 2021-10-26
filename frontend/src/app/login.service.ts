import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  getUser(): Observable<User> {
    const url = environment.apiUrl + `/users`;
    return this.http.get<User>(url);
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

  getCredentialsFromLocalStorage(): { username: string; password: string } {
    const username = localStorage.getItem('username') || '';
    const password = localStorage.getItem('password') || '';

    return {
      username,
      password,
    };
  }

  addCredentialsToLocalStorage(username: string, password: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }
}
