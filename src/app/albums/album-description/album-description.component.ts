import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// album service and interface
import { AlbumService } from '../../services/album.service';
import { Album } from '../../types/album.interface';

@Component({
  standalone: true,
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrl: './album-description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class AlbumDescriptionComponent implements OnInit, OnDestroy {
  album: Album | undefined;
  private destroy$ = new Subject<void>();

  // inject dependencies
  private route = inject(ActivatedRoute);
  private albumService = inject(AlbumService);

  public ngOnInit(): void {
    this.getAlbumById();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getAlbumById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // error checking
    if (!id) {
      console.error('Album ID not found in route parameters.');
      return;
    }
    this.albumService
      .getAlbumById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (album) => {
          this.album = album;
        },
        error: (error) => {
          console.error('Error fetching album description:', error);
        },
      });
  }
}
