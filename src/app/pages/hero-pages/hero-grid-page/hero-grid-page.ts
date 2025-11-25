import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { NavBar, Footer } from '../../../components';

// hero components
import { HeroGrid } from '../../../heroes';

@Component({
  selector: 'app-hero-grid-page',
  templateUrl: './hero-grid-page.html',
  styleUrls: ['./hero-grid-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDividerModule,
    NavBar,
    Footer,
    HeroGrid,
  ],
})
export class HeroGridPage {}
