import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBarComponent, FooterComponent } from '../../../components';

// hero components
import { HeroDetailsComponent, HeroDescriptionComponent, HeroMenuComponent } from '../../../heroes';

@Component({
  standalone: true,
  selector: 'app-hero-details-page',
  templateUrl: './hero-details-page.component.html',
  styleUrls: ['./hero-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBarComponent,
    FooterComponent,
    HeroDetailsComponent,
    HeroDescriptionComponent,
    HeroMenuComponent,
  ],
})
export class HeroDetailsPageComponent {}
