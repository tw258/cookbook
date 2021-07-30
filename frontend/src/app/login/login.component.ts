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
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      this.login.getLogin(username, password).subscribe(() => this.router.navigate(['/recipes']));
    }
  }

  handleLogin() {
    this.login.getLogin(this.username, this.password).subscribe(
      () => this.router.navigate(['/recipes']),
      () => (this.showInvalidLoginAlert = true),
    );
  }
}
