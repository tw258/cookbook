import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements AfterViewInit {
  @Input() recipe!: Recipe;
  @ViewChild('imgContainer') imgContainer: ElementRef<HTMLInputElement> | undefined;

  currentIndex = 0;

  private touchStartX = 0;
  private touchEndX = 0;

  constructor() {}

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
      // User simply touched the
      // screen without swiping, so we don't care.
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
  }

  private handleLeftToRightSwipe() {
    // Left to right means, the user wants to see the previous image.
    const isFirstImage = this.currentIndex === 0;

    if (isFirstImage) {
      // We're still at the first image so wew ignore the swipe.
      return;
    }

    this.currentIndex--;
  }

  private handleRightToLeftSwipe() {
    // Right to left means the user wants to see the next image.
    const isLastImage = this.currentIndex + 1 === this.recipe.imagesAsBase64.length;

    if (isLastImage) {
      // We have reached the last image so we ignore the swipe.
      return;
    }

    this.currentIndex++;
  }
}
