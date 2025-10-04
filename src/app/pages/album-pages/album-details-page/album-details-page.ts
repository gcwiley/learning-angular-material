import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBar, Footer } from '../../../components';

// album components
import { AlbumDescription, AlbumDetails } from '../../../albums';

@Component({
  standalone: true,
  selector: 'app-album-details-page',
  templateUrl: './album-details-page.html',
  styleUrl: './album-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBar, Footer, AlbumDescription, AlbumDetails],
})
export class AlbumDetailsPage {}
