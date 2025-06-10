import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-post-menu',
  imports: [],
  templateUrl: './post-menu.component.html',
  styleUrl: './post-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostMenuComponent {

}
