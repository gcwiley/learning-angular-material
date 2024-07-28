import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import the ablum service
import { AlbumService } from 'src/app/services/album.service';

// import the album interface
import { Album } from 'src/app/types/album.interface';

@Component({
   selector: 'app-album-list',
   templateUrl: './album-list.component.html',
   styleUrl: './album-list.component.scss',
   standalone: true,
   imports: [
      CommonModule,
      MatRippleModule,
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      RouterModule,
   ],
})
export class AlbumListComponent implements OnInit {
   // fix this later
   isLoadingResults = true;

   // set up the data source
   dataSource = new MatTableDataSource<Album>();

   // columns to display
   columnsToDisplay = ['title', 'artist', 'releaseDate', 'label', 'openAlbum', 'editAlbum', 'deleteAlbum'];

   constructor(private albumService: AlbumService, private router: Router) {}

   ngOnInit(): void {
      this.getAlbums();
   }

   // gets all heroes from hero service
   getAlbums(): void {
      this.albumService.getAlbums().subscribe((albums) => {
         this.dataSource.data = albums;
      });
   }

   // deletes a album
   onDeleteAlbum(id: string): void {
      this.albumService.deleteAlbum(id).subscribe(() => {
         // navigates admin back to the admin page
         this.router.navigateByUrl('/admin');
      });
   }
}
