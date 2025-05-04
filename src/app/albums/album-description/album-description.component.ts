import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

// album service and interface
import { AlbumService } from '../../services/album.service';
import { Album } from '../../types/album.interface';

@Component({
   standalone: true,
    selector: 'app-album-description',
    templateUrl: './album-description.component.html',
    styleUrl: './album-description.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class AlbumDescriptionComponent implements OnInit {
   album!: Album;

   constructor(private route: ActivatedRoute, private albumService: AlbumService) {}

   public ngOnInit(): void {
      this.getAlbum();
   }

   public getAlbum(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.albumService.getAlbumById(id).subscribe((album) => (this.album = album));
   }
}
