import { Component } from '@angular/core';

// shared components
import {
  NavBar,
  Footer,
} from '../../../components';

// hero components
import { HeroForm, RecentHeroes } from '../../../heroes';

@Component({
  selector: 'app-hero-form-page',
  templateUrl: './hero-form-page.html',
  styleUrls: ['./hero-form-page.scss'],
  imports: [
    NavBar,
    Footer,
    HeroForm,
    RecentHeroes,
  ],
})
export class HeroFormPage {}
