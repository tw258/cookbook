import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials, LocalStorageService } from './local-storage.service';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User> = this.userSubject.asObservable().pipe(filter(this.isUser));

  constructor(
    private http: HttpClient,
    private localstorageService: LocalStorageService,
    private router: Router,
  ) {
    if (this.localstorageService.checkIfCredentialsExist()) {
      // We load the user preemptively because it will be used by most components.
      this.getUser().subscribe(user => this.userSubject.next(user));
    }
  }

  checkCredentials({ username, password }: Credentials): Observable<boolean> {
    const url = `${environment.apiUrl}/check-credentials?username${username}&password=${password}`;

    return this.http.get<boolean>(url);
  }

  logout() {
    this.localstorageService.clearCredentials();

    this.router.navigate(['/login']);
  }

  private getUser(): Observable<User> {
    const url = environment.apiUrl + `/users`;

    return this.http.get<User>(url);
  }

  // Custom typeguard to check if object is a User.
  private isUser(user: User | null): user is User {
    return user != null;
  }
}
