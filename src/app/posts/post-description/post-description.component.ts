import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

// post service and interface
import { PostService } from '../../services/post.service';
import { Post } from '../../types/post.interface';

@Component({
  standalone: true,
  selector: 'app-post-description',
  templateUrl: './post-description.component.html',
  styleUrl: './post-description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class PostDescriptionComponent implements OnInit, OnDestroy {
  post!: Post; // initialize explicitly
  private destroy$ = new Subject<void>(); // subject to signal destruction
  public hasError = false;
  public isLoading = false;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

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
      this.hasError = true;
      this.isLoading = false;
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
          this.hasError = true;
          console.error('Error fetching post description:', error);
        },
      });
  }
}
