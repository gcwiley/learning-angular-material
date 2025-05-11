import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// hero service and interface
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../types/hero.interface';

@Component({
  standalone: true,
  selector: 'app-recent-heroes',
  templateUrl: './recent-heroes.component.html',
  styleUrls: ['./recent-heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentHeroesComponent implements OnInit {
  public recentHeroes$!: Observable<Hero[]>;

  constructor(private heroService: HeroService) {}

  public ngOnInit(): void {
    // get the observable stream of recently added heroes
    this.recentHeroes$ = this.heroService.getRecentlyCreatedHeroes().pipe(
      catchError((error) => {
        console.error('Error getting recent heroes.', error);
        return of([]);
      })
    );
  }
}
