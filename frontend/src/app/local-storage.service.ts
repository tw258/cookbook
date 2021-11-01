import { Injectable } from '@angular/core';
import { Credentials } from './models/credentials';

const USERNAME_KEY = 'cookbook_username';
const PASSWORD_KEY = 'cookbook_password';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Returns `true`, if credentials (username and password)
   * exist in local storage otherwise it returns `false`.
   */
  checkIfCredentialsExist(): boolean {
    const { password, username } = this.getCredentials();

    if (password && username) {
      return true;
    }

    return false;
  }

  getCredentials(): Credentials {
    const username = localStorage.getItem(USERNAME_KEY)!;
    const password = localStorage.getItem(PASSWORD_KEY)!;

    return { username, password };
  }

  setCredentials(credentials: Credentials): void {
    const { username, password } = credentials;

    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
  }

  clearCredentials(): void {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
  }
}
