import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
      RouterModule,
      AlbumTableComponent,
      HeroTableComponent,
   ],
})
export class AdminPageComponent {
   private breakpointObserver = inject(BreakpointObserver);

   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
   );
}
