import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getLogin(username: string, password: string): Observable<void> {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    const url = environment.apiUrl + `/login`;
    return this.http.get<void>(url);
  }
}
