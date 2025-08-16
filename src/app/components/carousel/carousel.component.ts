import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';

// slide interface
import { Slide } from '../../types/slide.interface';

@Component({
  standalone: true,
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
})
export class CarouselComponent {
  // use the @Input decorator to allow parent components to pass in the slides
  @Input() slides: Slide[] = [];

  // this property keeps track of the currently displayed slide's index in the slides array
  currentIndex = 0;

  // go to the previous slide
  public goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? this.slides.length - 1 : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }

  // go to the next slide
  public goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  // go to a specific slide - allows jumping directly to a slide
  public goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }
}
