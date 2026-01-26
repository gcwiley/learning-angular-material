import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// rxjs
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//  album service and interface
import { AlbumService } from '../../services/album.service';
import { Album } from '../../types/album.interface';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.html',
  styleUrl: './album-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatProgressSpinnerModule],
})
export class AlbumDetails {
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
