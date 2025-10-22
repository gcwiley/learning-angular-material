import { ChangeDetectionStrategy, Component } from '@angular/core';

// fix this!

@Component({
  standalone: true,
  selector: 'app-album-carousel',
  templateUrl: './album-carousel.html',
  styleUrl: './album-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class AlbumCarousel {}
