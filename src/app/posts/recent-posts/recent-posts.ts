import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

// post service and interface
import { PostService } from '../../services/post.service';
import { Post } from '../../types/post.interface';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.html',
  styleUrl: './recent-posts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule, MatIconModule, MatDividerModule],
})
export class RecentPosts implements OnInit {
  public recentPosts$!: Observable<Post[]>;

  // inject dependencies
  private postService = inject(PostService);

  public ngOnInit(): void {
      // get the observable stream of recently added posts
      this.recentPosts$ = this.postService.getRecentlyCreatedPosts().pipe(
        catchError((error) => {
          console.error('Error getting recent posts:', error);
          return of([]);
        })
      )
  }
}
