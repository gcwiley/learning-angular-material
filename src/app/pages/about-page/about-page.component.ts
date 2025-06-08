import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import {
  NavBarComponent,
  ClockComponent,
  FooterComponent,
} from '../../components';

@Component({
  standalone: true,
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBarComponent, ClockComponent, FooterComponent],
})
export class AboutPageComponent {}
