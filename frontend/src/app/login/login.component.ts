import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showInvalidLoginAlert = false;

  constructor(private login: LoginService, private router: Router) {}
  ngOnInit(): void {
    if (this.login.checkIfCredentialsStored()) {
      const { username, password } = this.login.getStoredCredentials();
      this.login.tryLogin(username, password).subscribe(() => this.router.navigate(['/recipes']));
    }
  }

  handleLogin() {
    this.login.tryLogin(this.username, this.password).subscribe(
      () => this.router.navigate(['/recipes']),
      () => (this.showInvalidLoginAlert = true),
    );
  }
}
