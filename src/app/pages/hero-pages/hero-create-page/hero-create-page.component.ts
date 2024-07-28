import { Component } from '@angular/core';

// import the shared components
import { NavBarComponent, FooterComponent } from 'src/app/shared';

// import the hero components
import { HeroFormComponent, RecentHeroesComponent } from 'src/app/heroes';

@Component({
   selector: 'app-hero-create-page',
   templateUrl: './hero-create-page.component.html',
   styleUrls: ['./hero-create-page.component.scss'],
   standalone: true,
   imports: [NavBarComponent, FooterComponent, HeroFormComponent, RecentHeroesComponent],
})
export class HeroCreatePageComponent {}
