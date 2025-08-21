import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-album-carousel',
  templateUrl: './album-carousel.component.html',
  styleUrl: './album-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class AlbumCarouselComponent {}
