import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';

// hero service and interface
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../types/hero.interface';

@Component({
  standalone: true,
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatListModule],
})
export class HeroDetailsComponent implements OnInit, OnDestroy {
  hero!: Hero; // initialisze explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction
  public isLoading = false;

  constructor(private route: ActivatedRoute, private heroService: HeroService) {}

  public ngOnInit(): void {
    this.getHeroById();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getHeroById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Hero ID not found in route parameters.');
      this.isLoading = false;
      return;
    }
    this.heroService
      .getHeroById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (hero) => {
          this.hero = hero;
        },
        error: (error) => {
          console.error('Error fetching hero details:', error);
        },
      });
  }
}
