import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

//  album service and interface
import { AlbumService } from '../../services/album.service';
import { Album } from '../../types/album.interface';

@Component({
  standalone: true,
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, DatePipe, MatListModule, MatIconModule],
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
  album!: Album; // initialize explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction
  public hasError = false;
  public isLoading = false;

  constructor(private route: ActivatedRoute, private albumService: AlbumService) {}

  public ngOnInit(): void {
    this.getAlbum();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // GET album by ID
  public getAlbum(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Album ID not found in route parameter.');
      this.hasError = true;
      this.isLoading = false;
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
          this.hasError = true;
          console.error('Error fetching album details:', error);
        },
      });
  }
}
