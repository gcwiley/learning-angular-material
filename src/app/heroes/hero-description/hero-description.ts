import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// rxjs
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// hero service and interface
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../types/hero.interface';

@Component({
  selector: 'app-hero-description',
  templateUrl: './hero-description.html',
  styleUrls: ['./hero-description.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class HeroDescription {
  // inject dependencies
  private route = inject(ActivatedRoute);
  private heroService = inject(HeroService);

  public hero$: Observable<Hero | undefined> = this.route.paramMap.pipe(
    map((pm) => pm.get('id')),
    filter((id): id is string => !!id),
    switchMap((id) =>
      this.heroService.getHeroById(id).pipe(
        catchError((error) => {
          console.error('Error fetching hero:', error);
          return of(undefined); // signal not found/error to template
        })
      )
    )
  );
}
