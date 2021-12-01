import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-password-change-dialog',
  templateUrl: './confirm-password-change-dialog.component.html',
  styleUrls: ['./confirm-password-change-dialog.component.css'],
})
export class ConfirmPasswordChangeDialogComponent {
  constructor(
    private matDialogRef: MatDialogRef<ConfirmPasswordChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { onCancel: () => void; onConfirm: () => void },
  ) {}

  onCancel() {
    this.data.onCancel();
    this.matDialogRef.close();
  }

  onConfirm() {
    this.data.onConfirm();
    this.matDialogRef.close();
  }
}
