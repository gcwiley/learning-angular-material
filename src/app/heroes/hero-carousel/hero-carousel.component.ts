import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class HeroCarouselComponent {}
