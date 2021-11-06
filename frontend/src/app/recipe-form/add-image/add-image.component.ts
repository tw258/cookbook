import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Image } from 'src/app/models/image';
import { compressAccurately } from 'image-conversion';

const MAX_IMAGE_SIZE_KB = 100;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_KB * 1000;

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent {
  @Output() imageAdd = new EventEmitter<Image>();
  @ViewChild('imageInput') imageInput: ElementRef<HTMLInputElement> | undefined;

  isLoading = false;

  async handleImageSelect(blobs: any) {
    this.isLoading = true;
    for (let i = 0; i < blobs.length; i++) {
      let blob: Blob = blobs.item(i);

      if (blob.size > MAX_IMAGE_SIZE_BYTES) {
        // Image is bigger than 100 KB so we compress it.

        blob = await compressAccurately(blob, MAX_IMAGE_SIZE_KB);
      }

      const dataAsBase64 = await this.imageToBase64(blob);
      this.imageAdd.emit({ _id: '', dataAsBase64 });
    }

    this.isLoading = false;
    this.imageInput!.nativeElement.value = '';
  }

  private imageToBase64(file: Blob): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
