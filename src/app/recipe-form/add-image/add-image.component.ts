import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent implements OnInit {
  @Output() imageUpload = new EventEmitter<string>();

  constructor() {}

  async handleImageSelect(images: FileList) {
    for (let i = 0; i < images.length; i++) {
      const base64string = await this.toBase64(images.item(i));
      this.imageUpload.emit(base64string);
    }
  }

  toBase64(file: File | null): Promise<any> {
    if (file == null) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  ngOnInit(): void {}
}
