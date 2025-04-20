import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// shared components
import { NavBarComponent, AnnouncementBannerComponent, FooterComponent } from '../../../components';

// album components
import { AlbumDescriptionComponent, AlbumDetailsComponent } from '../../../albums';

// album interface
import { Album } from '../../../types/album.interface';

// album service
import { AlbumService } from '../../../services/album.service';

@Component({
  standalone: true,
  selector: 'app-album-details-page',
  templateUrl: './album-details-page.component.html',
  styleUrl: './album-details-page.component.scss',
  imports: [
    RouterModule,
    CommonModule,
    NavBarComponent,
    AnnouncementBannerComponent,
    FooterComponent,
    AlbumDescriptionComponent,
    AlbumDetailsComponent,
  ],
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
    this.albumService.getAlbumById(id).subscribe((album) => (this.album = album));
  }
}
