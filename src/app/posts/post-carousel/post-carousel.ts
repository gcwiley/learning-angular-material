import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-carousel',
  templateUrl: './post-carousel.html',
  styleUrl: './post-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class PostCarousel {}
