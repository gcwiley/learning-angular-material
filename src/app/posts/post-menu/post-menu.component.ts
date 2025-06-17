import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'app-post-menu',
  templateUrl: './post-menu.component.html',
  styleUrl: './post-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatTooltipModule ],
})
export class PostMenuComponent {
  @Input() postId!: string;
  isFavorite = false;

  public toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // optionally, call a service to persist favorite state
  }
}
