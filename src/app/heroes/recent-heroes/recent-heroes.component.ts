import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular material
import { MatListModule } from '@angular/material/list';

// hero service and interface
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../types/hero.interface';

@Component({
   standalone: true,
    selector: 'app-recent-heroes',
    templateUrl: './recent-heroes.component.html',
    styleUrls: ['./recent-heroes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatListModule]
})
export class RecentHeroesComponent implements OnInit {
   recentHeroes!: Hero[];

   constructor(private heroService: HeroService) {}

   public ngOnInit(): void {
      this.getRecentHeroes();
   }

   public getRecentHeroes(): void {
      this.heroService.getRecentlyCreatedHeroes().subscribe((recentHeroes) => (this.recentHeroes = recentHeroes));
   }
}
