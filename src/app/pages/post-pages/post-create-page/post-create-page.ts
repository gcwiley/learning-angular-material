import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBar, Clock, Footer } from '../../../components';

// post components
import { PostForm, RecentPosts } from '../../../posts';

@Component({
  selector: 'app-post-create-page',
  templateUrl: './post-create-page.html',
  styleUrl: './post-create-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBar,
    Clock,
    Footer,
    PostForm,
    RecentPosts,
  ],
})
export class PostCreatePage {}
