import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-album-carousel',
  templateUrl: './album-carousel.html',
  styleUrl: './album-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class AlbumCarousel {}
