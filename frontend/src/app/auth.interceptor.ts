import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (!this.localStorage.checkIfCredentialsExist()) {
      return next.handle(request);
    }

    const { username, password } = this.localStorage.getCredentials();

    const requestWithAuthHeader = request.clone({
      setHeaders: { Authorization: `${username}:${password}` },
    });

    return next.handle(requestWithAuthHeader);
  }
}
