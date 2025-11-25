import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBar, Footer } from '../../../components';

// album components
import { AlbumForm, RecentAlbums } from '../../../albums';

@Component({
  selector: 'app-album-create-page',
  templateUrl: './album-create-page.html',
  styleUrl: './album-create-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBar, Footer, AlbumForm, RecentAlbums],
})
export class AlbumCreatePage {}
