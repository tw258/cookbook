import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localstorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    const { username, password } = this.localstorageService.getCredentials();

    const requestWithAuthHeader = request.clone({
      setHeaders: { Authorization: `${username}:${password}` },
    });

    return next.handle(requestWithAuthHeader);
  }
}
