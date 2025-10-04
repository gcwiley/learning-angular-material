import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBar, Footer } from '../../../components';

// hero components
import { HeroDetails, HeroDescription } from '../../../heroes';

@Component({
  standalone: true,
  selector: 'app-hero-details-page',
  templateUrl: './hero-details-page.html',
  styleUrls: ['./hero-details-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBar,
    Footer,
    HeroDetails,
    HeroDescription,
  ],
})
export class HeroDetailsPage {}
