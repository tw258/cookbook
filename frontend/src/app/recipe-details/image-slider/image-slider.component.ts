import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/image.service';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements OnInit, AfterViewInit {
  @Input() imageIds: string[] = [];

  // This array is empty first and will be
  // filled gradually, as the user swipes.
  lazyLoadedImages: Image[] = [];
  currentImage: Image | undefined;

  @ViewChild('imgContainer') imgContainer: ElementRef<HTMLInputElement> | undefined;

  currentIndex = 0;

  private touchStartX = 0;
  private touchEndX = 0;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    // We immediately load the first image.
    // This will be the only time where we don't lazy load.
    this.imageService
      .getImageById(this.imageIds[this.currentIndex])
      .subscribe(image => this.lazyLoadedImages.push(image));
  }

  ngAfterViewInit(): void {
    if (this.imgContainer) {
      this.imgContainer.nativeElement.addEventListener('touchstart', e => {
        // The swipe has started so we save the starting position.
        this.touchStartX = e.touches.item(0)!.clientX;
      });

      this.imgContainer.nativeElement.addEventListener('touchend', e => {
        this.touchEndX = e.changedTouches.item(0)!.clientX;

        this.handleSwipe();
      });
    }
  }

  private handleSwipe() {
    if (this.touchEndX === this.touchStartX) {
      // User simply touched the screen
      // without swiping, we don't care.
      return;
    }

    const isLeftToRight = this.touchStartX < this.touchEndX;

    if (isLeftToRight) {
      this.handleLeftToRightSwipe();
    }

    const isRightToLeft = this.touchStartX > this.touchEndX;

    if (isRightToLeft) {
      this.handleRightToLeftSwipe();
    }

    this.loadCurrentImage();
  }

  private loadCurrentImage() {
    const imageIdToDisplay = this.imageIds[this.currentIndex];

    const imageExistsLocally = this.lazyLoadedImages.some(i => i._id === imageIdToDisplay);

    if (imageExistsLocally) {
      this.currentImage = this.lazyLoadedImages.find(i => i._id === imageIdToDisplay);
    } else {
      // Image does not exist locally yet and
      // needs to be loaded from the server first.
      this.imageService.getImageById(imageIdToDisplay).subscribe(image => {
        this.lazyLoadedImages.push(image);
        this.currentImage = image;
      });
    }
  }

  private handleLeftToRightSwipe() {
    // Left to right means, the user wants to see the previous image.
    const isFirstImage = this.currentIndex === 0;

    if (isFirstImage) {
      // We're still at the first image so we ignore the swipe.
      return;
    }

    this.currentIndex--;
  }

  private handleRightToLeftSwipe() {
    // Right to left means the user wants to see the next image.
    const isLastImage = this.currentIndex + 1 === this.imageIds.length;

    if (isLastImage) {
      // We have reached the last image so we ignore the swipe.
      return;
    }

    this.currentIndex++;
  }
}
