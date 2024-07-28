import { Component } from '@angular/core';

// import the angular material modules
import { MatDividerModule } from '@angular/material/divider';

// import the album list
import { AlbumTableComponent } from '../../../albums';

// import the shared components
import { NavBarComponent, FooterComponent } from '../../../shared';

@Component({
   selector: 'app-album-grid-page',
   templateUrl: './album-grid-page.component.html',
   styleUrl: './album-grid-page.component.scss',
   standalone: true,
   imports: [MatDividerModule, AlbumTableComponent, NavBarComponent, FooterComponent],
})
export class AlbumGridPageComponent {}
