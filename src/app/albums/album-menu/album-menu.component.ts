import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-album-menu',
  templateUrl: './album-menu.component.html',
  styleUrl: './album-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule],
})
export class AlbumMenuComponent {}
