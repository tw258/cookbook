import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  newPassword = '';

  constructor(private userService: UserService) {}

  handleChangePassword() {
    this.userService.updatePassword(this.newPassword).subscribe(
      x => console.log('sucessfully changed'),
      err => console.log(err),
    );
  }
}
