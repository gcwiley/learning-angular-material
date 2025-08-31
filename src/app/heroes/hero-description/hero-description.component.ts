import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// rxjs
import { Subject, takeUntil } from 'rxjs';

// hero service and interface
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../types/hero.interface';

@Component({
  standalone: true,
  selector: 'app-hero-description',
  templateUrl: './hero-description.component.html',
  styleUrls: ['./hero-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class HeroDescriptionComponent implements OnInit, OnDestroy {
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
    // error checking
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
          console.error('Error fetching hero description:', error);
        },
      });
  }
}
