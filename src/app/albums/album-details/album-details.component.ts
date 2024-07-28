import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatListModule } from '@angular/material/list';

//  import the album interface
import { Album } from '../../types/album.interface';

// import the album service
import { AlbumService } from '../../services/album.service';

@Component({
   selector: 'app-album-details',
   templateUrl: './album-details.component.html',
   styleUrl: './album-details.component.scss',
   standalone: true,
   imports: [CommonModule, MatListModule],
})
export class AlbumDetailsComponent implements OnInit {
   album!: Album | undefined;

   constructor(private route: ActivatedRoute, private albumService: AlbumService) {}

   ngOnInit(): void {
      this.getAlbum();
   }

   // GET album by ID
   getAlbum(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.albumService.getAlbum(id).subscribe((album) => (this.album = album));
   }
}
