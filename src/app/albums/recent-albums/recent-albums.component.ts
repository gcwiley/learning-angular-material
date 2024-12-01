import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular material modules
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// import the album service
import { AlbumService } from '../../services/album.service';

// import the album interface
import { Album } from '../../types/album.interface';

@Component({
    selector: 'app-recent-albums',
    templateUrl: './recent-albums.component.html',
    styleUrl: './recent-albums.component.scss',
    imports: [CommonModule, MatListModule, MatIconModule]
})
export class RecentAlbumsComponent implements OnInit {
   recentAlbums!: Album[];

   constructor(private albumService: AlbumService) {}

   ngOnInit(): void {
      this.getRecentAlbums();
   }

   getRecentAlbums(): void {
      this.albumService.getRecentlyCreatedAlbums().subscribe((recentAlbums) => (this.recentAlbums = recentAlbums));
   }
}
