import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// album service and interface
import { AlbumService } from '../../services/album.service';
import { Album } from '../../types/album.interface';

@Component({
  standalone: true,
  selector: 'app-recent-albums',
  templateUrl: './recent-albums.component.html',
  styleUrl: './recent-albums.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentAlbumsComponent implements OnInit {
  public recentAlbums$!: Observable<Album[]>;

  constructor(private albumService: AlbumService) {}

  public ngOnInit(): void {
    // get the observable stream of recently added albums
    this.recentAlbums$ = this.albumService.getRecentlyCreatedAlbums().pipe(
      catchError((error) => {
        console.error('Error getting recent albums.', error);
        return of([]);
      })
    );
  }
}
