import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// post service and interface
import { PostService } from '../../services/post.service';
import { Post } from '../../types/post.interface';

@Component({
  standalone: true,
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrl: './recent-posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentPostsComponent implements OnInit {
  public recentPosts$!: Observable<Post[]>;

  constructor(private postService: PostService) {}

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
