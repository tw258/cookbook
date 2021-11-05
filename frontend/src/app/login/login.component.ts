import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  isCredentialsAlertVisible = false;
  wrongCredentialsCount = 0;

  constructor(
    private userService: UserService,
    private localstorageService: LocalStorageService,
    private router: Router,
  ) {}

  handleLoginClick() {
    this.userService.getAuthToken(this.username, this.password).subscribe(authToken => {
      if (authToken) {
        this.localstorageService.setAuthToken(authToken);
        this.router.navigateByUrl('/recipes');
      } else {
        this.isCredentialsAlertVisible = true;
        this.wrongCredentialsCount++;
      }
    });
  }
}
