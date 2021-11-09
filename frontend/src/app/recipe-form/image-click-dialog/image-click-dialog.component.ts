import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-click-dialog',
  templateUrl: './image-click-dialog.component.html',
  styleUrls: ['./image-click-dialog.component.css'],
})
export class ImageClickDialogComponent {
  imageSizeInBytes = this.data.size;
  isThumbnail = this.data.isThumbnail;

  constructor(
    public dialogRef: MatDialogRef<ImageClickDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      isThumbnail: boolean;
      size: number;
      onDelete: () => void;
      onMakeThumbnail: () => void;
    },
  ) {}

  onDelete() {
    this.data.onDelete();
    this.dialogRef.close();
  }

  onMakeThumbnail() {
    this.data.onMakeThumbnail();
    this.dialogRef.close();
  }
}
