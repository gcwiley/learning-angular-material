import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

// rxjs
import { Subject, takeUntil } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// post service and interface
import { PostService } from '../../services/post.service';
import { Post } from '../../types/post.interface';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, DatePipe, MatListModule, MatIconModule],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post!: Post;
  private destroy$ = new Subject<void>(); 
  
  // inject dependencies
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  public ngOnInit(): void {
    this.getPostById();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getPostById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // error checking
    if (!id) {
      console.error('Post ID not found in route paramaters.');
      return;
    }
    this.postService
      .getPostById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (post) => {
          this.post = post;
        },
        error: (error) => {
          console.error('Error fetching post details:', error);
        },
      });
  }
}
