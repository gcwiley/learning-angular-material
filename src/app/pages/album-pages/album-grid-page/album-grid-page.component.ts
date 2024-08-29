import { Component } from '@angular/core';

// import the angular material modules
import { MatDividerModule } from '@angular/material/divider';

// import the shared components
import { NavBarComponent, AnnouncementBannerComponent, FooterComponent } from '../../../shared';

// import the album list
import { AlbumGridComponent } from '../../../albums';

@Component({
   selector: 'app-album-grid-page',
   templateUrl: './album-grid-page.component.html',
   styleUrl: './album-grid-page.component.scss',
   standalone: true,
   imports: [MatDividerModule, AlbumGridComponent, NavBarComponent, AnnouncementBannerComponent, FooterComponent],
})
export class AlbumGridPageComponent {}
