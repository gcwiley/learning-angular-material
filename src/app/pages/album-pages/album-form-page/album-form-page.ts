import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBar, Footer } from '../../../components';

// album components
import { AlbumForm, RecentAlbums } from '../../../albums';

@Component({
  selector: 'app-album-form-page',
  templateUrl: './album-form-page.html',
  styleUrl: './album-form-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBar, Footer, AlbumForm, RecentAlbums],
})
export class AlbumFormPage {}
