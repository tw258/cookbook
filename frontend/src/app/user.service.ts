import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;

  constructor(private http: HttpClient) {}

  getAuthToken(username: string, password: string): Observable<string | null> {
    const url = `${environment.apiUrl}/auth-token`;

    const cleanUsername = username.toLocaleLowerCase().trim();

    let params = new HttpParams();
    params = params.set('username', cleanUsername);
    params = params.set('password', password);

    // The backend returns the auth token as a plain string.
    // We need to adjust the `responseType`, which expects JSON as default.
    return this.http.get(url, { responseType: 'text', params });
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

  updatePassword(newPassword: string): Observable<void> {
    const url = `${environment.apiUrl}/users/update-password`;

    return this.http.patch<void>(url, { password: newPassword });
  }
}
