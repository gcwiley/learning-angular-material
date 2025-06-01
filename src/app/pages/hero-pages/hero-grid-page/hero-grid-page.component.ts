import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { NavBarComponent, FooterComponent } from '../../../components';

// hero components
import { HeroGridComponent } from '../../../heroes';

@Component({
  standalone: true,
  selector: 'app-hero-grid-page',
  templateUrl: './hero-grid-page.component.html',
  styleUrls: ['./hero-grid-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDividerModule,
    NavBarComponent,
    FooterComponent,
    HeroGridComponent,
  ],
})
export class HeroGridPageComponent {}
