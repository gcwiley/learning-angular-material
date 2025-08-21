import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBarComponent, ClockComponent, FooterComponent } from '../../../components';

// post components
import { PostDescriptionComponent, PostDetailsComponent } from '../../../posts';

@Component({
  standalone: true,
  selector: 'app-post-details-page',
  templateUrl: './post-details-page.component.html',
  styleUrl: './post-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBarComponent,
    ClockComponent,
    FooterComponent,
    PostDescriptionComponent,
    PostDetailsComponent,
  ],
})
export class PostDetailsPageComponent {}
