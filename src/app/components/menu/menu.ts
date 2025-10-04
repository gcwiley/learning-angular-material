import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class Menu {}
