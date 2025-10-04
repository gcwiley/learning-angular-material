import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.html',
  styleUrl: './hero-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class HeroCarousel {}
