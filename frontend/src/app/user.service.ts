import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from './models/credentials';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;

  constructor(private http: HttpClient) {}

  checkCredentials({ username, password }: Credentials): Observable<boolean> {
    const url = `${environment.apiUrl}/check-credentials?username=${username}&password=${password}`;

    return this.http.get<boolean>(url);
  }

  getUser(): Observable<User> {
    if (this.user) {
      // User already exists in cache, so we return it.
      return of(this.user);
    }

    // Get the user from the API and store the response before returning it.
    // The next time `getUser()` gets called, the user will be loaded from cache.
    const url = `${environment.apiUrl}/users`;
    return this.http.get<User>(url).pipe(tap(user => (this.user = user)));
  }

  deleteUser(): void {
    this.user = null;
  }
}
