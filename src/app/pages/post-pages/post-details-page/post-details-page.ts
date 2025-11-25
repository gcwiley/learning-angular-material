import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBar, Clock, Footer } from '../../../components';

// post components
import { PostDescription, PostDetails } from '../../../posts';

@Component({
  selector: 'app-post-details-page',
  templateUrl: './post-details-page.html',
  styleUrl: './post-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBar,
    Clock,
    Footer,
    PostDescription,
    PostDetails,
  ],
})
export class PostDetailsPage {}
