import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
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
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  isPasswordVisible = false;

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    private matSnackbar: MatSnackBar,
    private router: Router,
  ) {}

  getErrorMessagePassword() {
    if (this.password.hasError('minlength')) {
      return 'Passwort muss mindestens 6 Zeichen lang sein!';
    }
    return 'Passwort muss gesetzt werden';
  }

  getErrorMessageConfirmPassword() {
    if (this.confirmPassword.hasError('minlength')) {
      return 'Passwort muss mindestens 6 Zeichen lang sein!';
    }
    return 'Passwort muss gesetzt werden';
  }

  onToggleVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  private updatePassword() {
    this.userService.updatePassword(this.password.value).subscribe({
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
