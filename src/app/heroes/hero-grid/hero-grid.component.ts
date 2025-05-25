import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// angular material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// hero service and interface
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../types/hero.interface';

@Component({
  standalone: true,
  selector: 'app-hero-grid',
  templateUrl: './hero-grid.component.html',
  styleUrls: ['./hero-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe
  ],
})
export class HeroGridComponent implements OnInit, OnDestroy {
  // dependencies
  private heroService = inject(HeroService);
  private breakpointObserver = inject(BreakpointObserver);

  // observables for AsycePipe
  public heroes!: Observable<Hero[]>;
  // observable for column based on breakpoints
  public cols!: Observable<number>;

  // static grid properties
  rowHeight = '1:1';
  gutterSize = '0px';
  colspan = 2;
  rowspan = 1;

  // lifecycle management - subject to manage subscription cleanup
  private destroy = new Subject<void>();

  public ngOnInit(): void {
    this.heroes = this.heroService.getHeroes().pipe();

    this.cols = this.breakpointObserver
      .observe([
        // define breakpoints to observe
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        takeUntil(this.destroy),
        map((state: BreakpointState) => {
          // map breakpoint state to number of columns
          if (state.breakpoints[Breakpoints.XSmall]) {
            return 1; // e.g. handset portrait
          }
          if (state.breakpoints[Breakpoints.Small]) {
            return 2; // e.g. handset landscape / tablet portrait
          }
          if (state.breakpoints[Breakpoints.Medium]) {
            return 3; // e.g. tablet landscape
          }
          // default for large/x-large or none of the above match
          return 5;
        })
      );
  }

  public ngOnDestroy(): void {
    // signal component destruction
    this.destroy.next();
    this.destroy.complete();
  }

  // optional: if you need to track items for *ngFor preformance
  public trackByHeroId(index: number, hero: Hero): string {
    return hero.id;
  }
}
