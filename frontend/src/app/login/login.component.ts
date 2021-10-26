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
  isPasswordVisible = false;

  constructor(private login: LoginService, private router: Router) {}
  ngOnInit(): void {
    if (this.login.checkIfCredentialsStored()) {
      this.login.getUser().subscribe(() => this.router.navigate(['/recipes']));
    }
  }

  handleLogin() {
    this.login.addCredentialsToLocalStorage(this.username, this.password);
    this.login.getUser().subscribe(
      () => this.router.navigate(['/recipes']),
      () => (this.showInvalidLoginAlert = true),
    );
  }
}
