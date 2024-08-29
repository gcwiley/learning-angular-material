import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';

// import the album list component
import { AlbumTableComponent } from '../../albums';

// import the heroes list component
import { HeroTableComponent } from '../../heroes';

@Component({
   selector: 'app-admin-page',
   templateUrl: './admin-page.component.html',
   styleUrl: './admin-page.component.scss',
   standalone: true,
   imports: [
      CommonModule,
      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      MatTabsModule,
      MatTooltip,
      RouterModule,
      AlbumTableComponent,
      HeroTableComponent,
   ],
})
export class AdminPageComponent {
   events: string[] = [];
   opened!: boolean;
}
