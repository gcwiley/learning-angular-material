import { Component } from '@angular/core';

// import the shared components
import { NavBarComponent, FooterComponent } from 'src/app/shared';

// import the album components
import { AlbumDescriptionComponent, AlbumDetailsComponent } from 'src/app/albums';

@Component({
   selector: 'app-album-details-page',
   templateUrl: './album-details-page.component.html',
   styleUrl: './album-details-page.component.scss',
   standalone: true,
   imports: [NavBarComponent, FooterComponent, AlbumDescriptionComponent, AlbumDetailsComponent],
})
export class AlbumDetailsPageComponent {}
