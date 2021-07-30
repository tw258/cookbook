import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const authRequest = request.clone({
      setHeaders: { Authorization: `${username}:${password}` },
    });

    return next.handle(authRequest);
  }
}
