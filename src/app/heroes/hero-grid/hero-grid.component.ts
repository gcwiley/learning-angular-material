import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router, RouterModule } from '@angular/router';

// import the angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import the hero service
import { HeroService } from '../../services/hero.service';

// import the hero type
import { Hero } from '../../types/hero.interface';

@Component({
   standalone: true,
    selector: 'app-hero-grid',
    templateUrl: './hero-grid.component.html',
    styleUrls: ['./hero-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule]
})
export class HeroGridComponent implements OnInit {
   // create the member variables
   heroes: Hero[] = [];

   // set up the grid list demensions
   cols = 5; // Amount of columns in the grid list.
   rowHeight = '1:1'; // row height
   gutterSize = '0px';

   // set up the grid list dimensions
   colspan = 1; // fix this!
   rowspan = 1; // fix this!

   constructor(private heroService: HeroService, private breakpointObserver: BreakpointObserver, private router: Router) {}

   ngOnInit(): void {
      this.getHeroes();
      this.layoutChanges();
   }

   // responsive code
   layoutChanges(): void {
      this.breakpointObserver
         .observe([Breakpoints.TabletPortrait, Breakpoints.TabletLandscape, Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
         .subscribe((result) => {
            const breakpoints = result.breakpoints;

            // check to see if viewport is in table portrait mode
            if (breakpoints[Breakpoints.TabletPortrait]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.HandsetPortrait]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.HandsetLandscape]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.TabletLandscape]) {
               this.cols = 2;
            }
         });
   }

   // gets all heroes from the database
   getHeroes(): void {
      this.heroService.getHeroes().subscribe((heroes) => {
         this.heroes = heroes;
      });
   }
}
