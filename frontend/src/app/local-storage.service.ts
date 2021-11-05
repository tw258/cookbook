import { Injectable } from '@angular/core';

const AUTH_TOKEN_KEY = 'cookbook_auth-token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  checkIfAuthTokenExists(): boolean {
    const authToken = this.getAuthToken();

    if (authToken) {
      return true;
    }

    return false;
  }

  getAuthToken(): string {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY)!;

    return authToken;
  }

  setAuthToken(authToken: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  }

  clearAuthToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
