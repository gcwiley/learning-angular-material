import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

// import the album interface
import { Album } from '../../types/album.interface';

// import the album service
import { AlbumService } from '../../services/album.service';

@Component({
   standalone: true,
    selector: 'app-album-description',
    templateUrl: './album-description.component.html',
    styleUrl: './album-description.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf]
})
export class AlbumDescriptionComponent implements OnInit {
   album!: Album;

   constructor(private route: ActivatedRoute, private albumService: AlbumService) {}

   public ngOnInit(): void {
      this.getAlbum();
   }

   // GET: album by id
   public getAlbum(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.albumService.getAlbumById(id).subscribe((album) => (this.album = album));
   }
}
