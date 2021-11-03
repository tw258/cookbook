import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-recipe-delete-dialog',
  templateUrl: './confirm-recipe-delete-dialog.component.html',
  styleUrls: ['./confirm-recipe-delete-dialog.component.css'],
})
export class ConfirmRecipeDeleteDialogComponent {
  recipeTitle = this.data.recipeTitle;

  constructor(
    public dialogRef: MatDialogRef<ConfirmRecipeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { recipeTitle: string; onConfirm: () => void; onCancel: () => void },
  ) {}

  onCancel() {
    this.data.onCancel();
    this.dialogRef.close();
  }

  onConfirm() {
    this.data.onConfirm();
    this.dialogRef.close();
  }
}
