import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ConfirmPasswordChangeDialogComponent } from './confirm-password-change-dialog/confirm-password-change-dialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  newPassword = '';
  isPasswordVisible = false;

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    private matSnackbar: MatSnackBar,
    private router: Router,
  ) {}

  onToggleVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  private updatePassword() {
    this.userService.updatePassword(this.newPassword).subscribe({
      complete: () => {
        this.matSnackbar.open('Passwort erfolgreich geändert', 'OK', { duration: 3000 });
        this.router.navigateByUrl('/recipes');
      },
      error: err => console.log(err),
    });
  }

  handleChangePassword() {
    this.matDialog.open(ConfirmPasswordChangeDialogComponent, {
      data: {
        onConfirm: () => this.updatePassword(),
        onCancel: () => {}, //we ignore Cancel
      },
    });
  }
}
