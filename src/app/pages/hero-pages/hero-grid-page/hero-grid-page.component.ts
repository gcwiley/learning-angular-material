import { Component } from '@angular/core';

// import the angular material modules
import { MatDividerModule } from '@angular/material/divider';

// import the shared components
import { NavBarComponent, AnnouncementBannerComponent, FooterComponent } from '../../../shared';

// import the hero grid
import { HeroGridComponent } from '../../../heroes';

@Component({
   selector: 'app-hero-grid-page',
   templateUrl: './hero-grid-page.component.html',
   styleUrls: ['./hero-grid-page.component.scss'],
   standalone: true,
   imports: [MatDividerModule, NavBarComponent, AnnouncementBannerComponent, FooterComponent, HeroGridComponent],
})
export class HeroGridPageComponent {}
