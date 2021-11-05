import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (!this.localStorage.checkIfAuthTokenExists()) {
      return next.handle(request);
    }

    const authToken = this.localStorage.getAuthToken();

    const requestWithAuthHeader = request.clone({
      setHeaders: { Authorization: authToken },
    });

    return next.handle(requestWithAuthHeader);
  }
}
