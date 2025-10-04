import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// rxjs
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// post service and interface
import { PostService } from '../../services/post.service';
import { Post } from '../../types/post.interface';

@Component({
  standalone: true,
  selector: 'app-post-details',
  templateUrl: './post-details.html',
  styleUrl: './post-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
})
export class PostDetailsComponent {
  // inject dependencies
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  

}
