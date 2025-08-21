import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class MenuComponent {}
