import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

// import the angular material modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

// shared components
import {
   NavBarComponent,
   AnnouncementBannerComponent,
   AppLogoComponent,
   FooterComponent,
} from '../../components/index';

// carousel
import { CarouselComponent, CarouselItemDirective } from '../../components/index';

// import the hero service
import { HeroService } from '../../services/hero.service';

// import the hero interface
import { Hero } from '../../types/hero.interface';

// fix this later
const TOP_COMPONENTS = ['datepicker', 'input', 'slide-toggle', 'slider', 'button'];

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    imports: [
        RouterLink,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        NavBarComponent,
        AnnouncementBannerComponent,
        FooterComponent,
        CarouselComponent,
        CarouselItemDirective,
        AppLogoComponent,
        NgFor,
    ]
})
export class HomepageComponent implements OnInit {
   recentHeroes!: Hero[];

   constructor(private heroService: HeroService) {}

   ngOnInit(): void {
      this.getRecentHeroes();
   }

   // fix this later
   getRecentHeroes(): void {
      this.heroService.getRecentlyCreatedHeroes().subscribe((recentHeroes) => (this.recentHeroes = recentHeroes));
   }

   // fix this later!
   getTopComponents(): string[] {
      return TOP_COMPONENTS;
   }
}
