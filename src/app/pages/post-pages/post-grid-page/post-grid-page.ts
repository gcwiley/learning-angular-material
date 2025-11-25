import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { NavBar, Clock, Footer } from '../../../components';

// post components
import { PostGrid } from '../../../posts';

@Component({
  selector: 'app-post-grid-page',
  templateUrl: './post-grid-page.html',
  styleUrl: './post-grid-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDividerModule,
    NavBar,
    Clock,
    Footer,
    PostGrid,
  ],
})
export class PostGridPage {}
