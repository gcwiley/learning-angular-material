import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { NavBarComponent, ClockComponent, FooterComponent } from '../../../components';

// post components
import { PostGridComponent } from '../../../posts';

@Component({
  standalone: true,
  selector: 'app-post-grid-page',
  templateUrl: './post-grid-page.component.html',
  styleUrl: './post-grid-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDividerModule,
    NavBarComponent,
    ClockComponent,
    FooterComponent,
    PostGridComponent,
  ],
})
export class PostGridPageComponent {}
