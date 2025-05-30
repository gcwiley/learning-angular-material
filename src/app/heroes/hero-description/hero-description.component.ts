import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

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
  hero!: Hero; // initialize explicity
  private destroy$ = new Subject<void>(); // subject to signal destruction
  public hasError = false;
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
      this.hasError = true;
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
          this.hasError = true;
          console.error('Error fetching hero description:', error);
        },
      });
  }
}
