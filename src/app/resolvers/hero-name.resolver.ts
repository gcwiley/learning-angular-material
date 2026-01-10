import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, of, catchError } from 'rxjs';

// import hero service
import { HeroService } from '../services/hero.service';

export const heroNameResolver: ResolveFn<string> = (route) => {
  const heroService = inject(HeroService);
  const id = route.paramMap.get('id');

  if (!id) {
    return of('Hero Details');
  }

  // assumes getAlbumById returns an observable with a 'name' property
  return heroService.getHeroById(id).pipe(
    map((hero) => (hero ? `${hero.name} | Portfolio` : 'Hero Details')),
    // fallback in case of error
    catchError(() => of('Hero Details')),
  );
};
