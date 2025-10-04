import { Component } from '@angular/core';

// shared components
import {
  NavBar,
  Footer,
} from '../../../components';

// hero components
import { HeroForm, RecentHeroes } from '../../../heroes';

@Component({
  selector: 'app-hero-create-page',
  templateUrl: './hero-create-page.html',
  styleUrls: ['./hero-create-page.scss'],
  imports: [
    NavBar,
    Footer,
    HeroForm,
    RecentHeroes,
  ],
})
export class HeroCreatePage {}
