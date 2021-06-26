import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent implements OnInit {
  @Output() imageUpload = new EventEmitter<File>();
  //this.imageUpload.emit(file);
  //<app-add-image (imageUpload)="handleImageUpload($event)"> <
  constructor() {}

  ngOnInit(): void {}
}
