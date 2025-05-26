import { Component } from '@angular/core';

// shared components
import {
  NavBarComponent,
  AnnouncementBarComponent,
  AuthStatusComponent,
  FooterComponent,
} from '../../../components';

// hero components
import { HeroFormComponent, RecentHeroesComponent } from '../../../heroes';

@Component({
  selector: 'app-hero-create-page',
  templateUrl: './hero-create-page.component.html',
  styleUrls: ['./hero-create-page.component.scss'],
  imports: [
    NavBarComponent,
    AnnouncementBarComponent,
    AuthStatusComponent,
    FooterComponent,
    HeroFormComponent,
    RecentHeroesComponent,
  ],
})
export class HeroCreatePageComponent {}
