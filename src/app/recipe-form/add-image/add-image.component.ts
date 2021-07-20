import { Component, EventEmitter, Output } from '@angular/core';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent {
  @Output() imageUpload = new EventEmitter<string>();

  async handleImageSelect(images: FileList) {
    for (let i = 0; i < images.length; i++) {
      const image = images.item(i);

      if (image === null) {
        return;
      }

      const compressedImage = await this.getCompressedImage(image);
      const imageAsBase64 = await this.toBase64(compressedImage);

      this.imageUpload.emit(imageAsBase64);
    }
  }

  async getCompressedImage(file: File) {
    return await imageCompression(file, { maxSizeMB: 0.2 });
  }

  toBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
