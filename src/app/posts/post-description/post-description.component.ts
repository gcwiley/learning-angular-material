import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

// rxjs
import { Subject, takeUntil } from 'rxjs';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// post service and interface
import { PostService } from '../../services/post.service';
import { Post } from '../../types/post.interface';

@Component({
  standalone: true,
  selector: 'app-post-description',
  templateUrl: './post-description.component.html',
  styleUrl: './post-description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatDividerModule, DatePipe],
})
export class PostDescriptionComponent implements OnInit, OnDestroy {
  post!: Post; // initialize explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction

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
    if (!id) {
      console.error('Post ID not found in route parameters.');
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
          console.error('Error fetching post description:', error);
        },
      });
  }
}
