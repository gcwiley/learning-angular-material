import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular material modules
import { MatListModule } from '@angular/material/list';

// import the hero service
import { HeroService } from '../../services/hero.service';

// import the hero interface
import { Hero } from '../../types/hero.interface';

@Component({
   selector: 'app-recent-heroes',
   templateUrl: './recent-heroes.component.html',
   styleUrls: ['./recent-heroes.component.scss'],
   standalone: true,
   imports: [CommonModule, MatListModule],
})
export class RecentHeroesComponent implements OnInit {
   recentHeroes!: Hero[];

   constructor(private heroService: HeroService) {}

   ngOnInit(): void {
      this.getRecentHeroes();
   }

   getRecentHeroes(): void {
      this.heroService.getRecentlyCreatedHeroes().subscribe((recentHeroes) => (this.recentHeroes = recentHeroes));
   }
}
