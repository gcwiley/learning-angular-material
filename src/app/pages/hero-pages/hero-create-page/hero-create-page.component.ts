import { Component } from '@angular/core';

// shared components
import { NavBarComponent, AnnouncementBarComponent, FooterComponent } from '../../../components';

// hero components
import { HeroFormComponent, RecentHeroesComponent } from '../../../heroes';

@Component({
    selector: 'app-hero-create-page',
    templateUrl: './hero-create-page.component.html',
    styleUrls: ['./hero-create-page.component.scss'],
    imports: [NavBarComponent, AnnouncementBarComponent, FooterComponent, HeroFormComponent, RecentHeroesComponent]
})
export class HeroCreatePageComponent {}
