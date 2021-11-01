import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { Credentials } from '../models/credentials';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: Credentials = { username: '', password: '' };

  isCredentialsAlertVisible = false;
  isPasswordVisible = false;

  constructor(
    private userService: UserService,
    private localstorageService: LocalStorageService,
    private router: Router,
  ) {}

  handleLoginClick() {
    this.userService.checkCredentials(this.credentials).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.localstorageService.setCredentials(this.credentials);
        this.router.navigateByUrl('/recipes');
      } else {
        this.isCredentialsAlertVisible = true;
      }
    });
  }
}
