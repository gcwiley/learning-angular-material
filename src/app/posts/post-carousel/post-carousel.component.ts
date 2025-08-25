import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material

@Component({
  standalone: true,
  selector: 'app-post-carousel',
  templateUrl: './post-carousel.component.html',
  styleUrl: './post-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class PostCarouselComponent {}
