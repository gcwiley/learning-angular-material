import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// rxjs
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// post service and interface
import { PostService } from '../../services/post.service';
import { Post } from '../../types/post.interface';

@Component({
  selector: 'app-post-description',
  templateUrl: './post-description.html',
  styleUrl: './post-description.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatDividerModule],
})
export class PostDescription {
  // inject dependencies
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  public post$: Observable<Post | undefined> = this.route.paramMap.pipe(
    map((pm) => pm.get('id')),
    filter((id): id is string => !!id),
    switchMap((id) =>
      this.postService.getPostById(id).pipe(
        catchError((error) => {
          console.error('Error fetching post:', error);
          return of(undefined); // signal not found/error to template
        })
      )
    )
  );
}
