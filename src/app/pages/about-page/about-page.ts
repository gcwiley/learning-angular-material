import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import {
  NavBar,
  Clock,
  Footer,
} from '../../components';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBar, Clock, Footer],
})
export class AboutPage {}
