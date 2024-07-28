import { Component } from '@angular/core';

// import the shared components
import { NavBarComponent, FooterComponent } from '../../../shared';

// import the album components
import { AlbumFormComponent, RecentAlbumsComponent } from '../../../albums';

@Component({
   selector: 'app-album-create-page',
   templateUrl: './album-create-page.component.html',
   styleUrl: './album-create-page.component.scss',
   standalone: true,
   imports: [NavBarComponent, FooterComponent, AlbumFormComponent, RecentAlbumsComponent],
})
export class AlbumCreatePageComponent {}
