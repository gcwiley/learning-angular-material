import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatButtonModule],
})
export class ActionBarComponent {}
