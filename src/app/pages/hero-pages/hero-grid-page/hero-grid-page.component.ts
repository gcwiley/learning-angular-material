import { Component } from '@angular/core';

// import the angular material modules
import { MatDividerModule } from '@angular/material/divider';

// import the shared components
import { NavBarComponent, FooterComponent } from 'src/app/shared';

// import the hero components
import { HeroGridComponent } from 'src/app/heroes';

@Component({
   selector: 'app-hero-grid-page',
   templateUrl: './hero-grid-page.component.html',
   styleUrls: ['./hero-grid-page.component.scss'],
   standalone: true,
   imports: [MatDividerModule, NavBarComponent, FooterComponent, HeroGridComponent],
})
export class HeroGridPageComponent {}
