import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-logo',
  templateUrl: './logo.html',
  styleUrls: ['./logo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class Logo {}
