import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-post-details-page',
  templateUrl: './post-details-page.component.html',
  styleUrl: './post-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class PostDetailsPageComponent {}
