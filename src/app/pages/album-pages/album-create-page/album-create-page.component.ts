import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBarComponent, AnnouncementBarComponent, AuthStatusComponent, FooterComponent } from '../../../components';

// album components
import { AlbumFormComponent, RecentAlbumsComponent } from '../../../albums';

@Component({
  standalone: true,
  selector: 'app-album-create-page',
  templateUrl: './album-create-page.component.html',
  styleUrl: './album-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBarComponent,
    AnnouncementBarComponent,
    FooterComponent,
    AuthStatusComponent,
    AlbumFormComponent,
    RecentAlbumsComponent,
  ],
})
export class AlbumCreatePageComponent {}
