import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBarComponent, FooterComponent } from '../../../components';

// album components
import {
  AlbumDescriptionComponent,
  AlbumMenuComponent,
  AlbumDetailsComponent,
} from '../../../albums';

@Component({
  standalone: true,
  selector: 'app-album-details-page',
  templateUrl: './album-details-page.component.html',
  styleUrl: './album-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBarComponent, FooterComponent, AlbumDescriptionComponent, AlbumDetailsComponent, AlbumMenuComponent],
})
export class AlbumDetailsPageComponent {}
