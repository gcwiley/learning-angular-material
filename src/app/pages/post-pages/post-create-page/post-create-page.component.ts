import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBarComponent, FooterComponent } from '../../../components';

// post components
import { PostFormComponent, RecentPostsComponent } from '../../../posts';

@Component({
  standalone: true,
  selector: 'app-post-create-page',
  templateUrl: './post-create-page.component.html',
  styleUrl: './post-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBarComponent,
    FooterComponent,
    PostFormComponent,
    RecentPostsComponent,
  ],
})
export class PostCreatePageComponent {}
