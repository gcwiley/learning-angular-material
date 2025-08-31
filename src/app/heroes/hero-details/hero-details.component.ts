import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// rxjs
import { Subject, takeUntil } from 'rxjs';

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
  hero: Hero | undefined = undefined;
  private destroy$ = new Subject<void>();

  // inject dependencies
  private route = inject(ActivatedRoute);
  private heroService = inject(HeroService);

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
