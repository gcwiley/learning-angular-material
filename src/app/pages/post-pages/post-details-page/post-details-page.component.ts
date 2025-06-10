import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBarComponent, ClockComponent, FooterComponent } from '../../../components';

// post components
import { PostDescriptionComponent, PostMenuComponent, PostDetailsComponent } from '../../../posts';

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
    PostMenuComponent,
    PostDetailsComponent,
  ],
})
export class PostDetailsPageComponent {}
