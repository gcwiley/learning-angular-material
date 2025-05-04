import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material 
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { NavBarComponent, AnnouncementBarComponent, FooterComponent } from '../../../components';

// import the hero grid
import { HeroGridComponent } from '../../../heroes';

@Component({
    selector: 'app-hero-grid-page',
    templateUrl: './hero-grid-page.component.html',
    styleUrls: ['./hero-grid-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatDividerModule, NavBarComponent, AnnouncementBarComponent, FooterComponent, HeroGridComponent]
})
export class HeroGridPageComponent {}
