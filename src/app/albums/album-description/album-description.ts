import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// rxjs
import { Subject, takeUntil } from 'rxjs';

// album service and interface
import { AlbumService } from '../../services/album.service';
import { Album } from '../../types/album.interface';

@Component({
  standalone: true,
  selector: 'app-album-description',
  templateUrl: './album-description.html',
  styleUrl: './album-description.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class AlbumDescription {}
