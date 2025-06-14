import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

// album directive
import { AlbumDeleteDirective } from '../../directives/album-delete.directive';

@Component({
  standalone: true,
  selector: 'app-album-menu',
  templateUrl: './album-menu.component.html',
  styleUrl: './album-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatIconModule, MatTooltipModule, AlbumDeleteDirective],
})
export class AlbumMenuComponent {
  @Input() albumId!: string;
  isFavorite = false;

  public toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // optionally, call a service to persist favorite state
  }
}
