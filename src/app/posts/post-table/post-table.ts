import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.html',
  styleUrl: './post-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class PostTable {}
