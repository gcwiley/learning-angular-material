import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the shared components
import { NavBarComponent, FooterComponent } from '../../../shared';

// import the album components
import { AlbumDescriptionComponent, AlbumDetailsComponent } from '../../../albums';

// import the album interface
import { Album } from '../../../types/album.interface';

// import the album service
import { AlbumService } from '../../../services/album.service';

@Component({
   standalone: true,
   selector: 'app-album-details-page',
   templateUrl: './album-details-page.component.html',
   styleUrl: './album-details-page.component.scss',
   imports: [RouterModule, CommonModule, NavBarComponent, FooterComponent, AlbumDescriptionComponent, AlbumDetailsComponent],
})
export class AlbumDetailsPageComponent implements OnInit {
   album!: Album | undefined;

   // inject the album and router services
   constructor(private route: ActivatedRoute, private albumService: AlbumService) {}

   ngOnInit(): void {
      this.getAlbum();
   }

   // GET Album by id
   getAlbum(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.albumService.getAlbum(id).subscribe((album) => (this.album = album));
   }
}
