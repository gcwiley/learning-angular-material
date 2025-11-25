import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ImageCarousel {}
