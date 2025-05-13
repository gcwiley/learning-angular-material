import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrl: './post-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class PostTableComponent {}
