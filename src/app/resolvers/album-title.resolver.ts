import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, of, catchError } from 'rxjs';

// import album service
import { AlbumService } from '../services/album.service';

export const albumTitleResolver: ResolveFn<string> = (route) => {
  const albumService = inject(AlbumService);
  const id = route.paramMap.get('id');

  if (!id) {
    return of('Album Details');
  }

  // assumes getAlbum returns an observable with a 'title' property
  return albumService.getAlbumById(id).pipe(
    map((album) => (album ? `${album.title} | Portfolio` : 'Album Details')),
    // fallback in case of error
    catchError(() => of('Album details')),
  );
};
