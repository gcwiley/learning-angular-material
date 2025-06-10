import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-hero-menu',
  templateUrl: './hero-menu.component.html',
  styleUrl: './hero-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule],
})
export class HeroMenuComponent {}
