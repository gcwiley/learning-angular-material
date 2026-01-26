import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// rxjs
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// album service and interface
import { AlbumService } from '../../services/album.service';
import { Album } from '../../types/album.interface';

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.html',
  styleUrl: './album-description.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class AlbumDescription {
  // inject dependencies
  private readonly route = inject(ActivatedRoute);
  private readonly albumService = inject(AlbumService);

  public album$: Observable<Album | undefined> = this.route.paramMap.pipe(
    map((pm) => pm.get('id')),
    filter((id): id is string => !!id),
    switchMap((id) =>
      this.albumService.getAlbumById(id).pipe(
        catchError((error) => {
          console.error('Error fetching album:', error);
          return of(undefined); // signal not found/error to template
        })
      )
    )
  );
}
