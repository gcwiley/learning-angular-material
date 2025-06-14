import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

// hero directive
import { HeroDeleteDirective } from '../../directives/hero-delete.directive';

@Component({
  standalone: true,
  selector: 'app-hero-menu',
  templateUrl: './hero-menu.component.html',
  styleUrl: './hero-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatTooltipModule, HeroDeleteDirective],
})
export class HeroMenuComponent {
  @Input() heroId!: string;
  isFavorite = false;

  public toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // optionally, call a service to presist favorite state
  }
}
