import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import Compress from 'compress.js';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent {
  @Output() imageAdd = new EventEmitter<string>();
  @ViewChild('imageInput') imageInput: ElementRef<HTMLInputElement> | undefined;

  isLoading = false;

  private compressor = new Compress();

  async handleImageSelect(images: FileList) {
    this.isLoading = true;
    for (let i = 0; i < images.length; i++) {
      let image: any = images.item(i);

      if (!image) {
        return;
      }

      let imageAsBase64;
      if (image.size > 100000) {
        // Image is bigger than 100 KB, so we compress it.

        const compressOptions: any = {
          size: 0.1, // The max size in MB.
          // See https://www.npmjs.com/package/compress.js for more options.
        };

        image = (await this.compressor.compress([image], compressOptions))[0];
        imageAsBase64 = `${image.prefix}${image.data}`;
      } else {
        imageAsBase64 = await this.imageToBase64(image);
      }

      this.imageAdd.emit(imageAsBase64);
    }

    this.isLoading = false;
    this.imageInput!.nativeElement.value = '';
  }

  private imageToBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
