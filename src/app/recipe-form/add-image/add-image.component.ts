import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent implements OnInit {
  @Output() imageUpload = new EventEmitter<string>();

  constructor() {}

  handleImageSelect(image: File) {
    //Base64decodingLogic

    this.imageUpload.emit('imageAsBase64');
  }

  ngOnInit(): void {}
}
