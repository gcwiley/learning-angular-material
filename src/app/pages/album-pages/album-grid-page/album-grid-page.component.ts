import { Component } from '@angular/core';

// import the angular material modules
import { MatDividerModule } from '@angular/material/divider';

// import the album list
import { AlbumListComponent } from 'src/app/albums';

// import the shared components
import { NavBarComponent, FooterComponent } from 'src/app/shared';

@Component({
   selector: 'app-album-grid-page',
   templateUrl: './album-grid-page.component.html',
   styleUrl: './album-grid-page.component.scss',
   standalone: true,
   imports: [MatDividerModule, AlbumListComponent, NavBarComponent, FooterComponent],
})
export class AlbumGridPageComponent {}
