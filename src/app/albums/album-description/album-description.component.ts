import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

// import the album interface
import { Album } from '../../types/album.interface';

// import the album service
import { AlbumService } from '../../services/album.service';

@Component({
    selector: 'app-album-description',
    templateUrl: './album-description.component.html',
    styleUrl: './album-description.component.scss',
    imports: [NgIf]
})
export class AlbumDescriptionComponent implements OnInit {
   album!: Album;

   constructor(private route: ActivatedRoute, private albumService: AlbumService) {}

   ngOnInit(): void {
      this.getAlbum();
   }

   // GET: album by id
   getAlbum(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.albumService.getAlbum(id).subscribe((album) => (this.album = album));
   }
}
