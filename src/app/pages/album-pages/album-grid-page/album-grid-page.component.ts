import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { NavBarComponent, AnnouncementBarComponent, FooterComponent } from '../../../components';

// album components
import { AlbumGridComponent } from '../../../albums';

@Component({
    selector: 'app-album-grid-page',
    templateUrl: './album-grid-page.component.html',
    styleUrl: './album-grid-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatDividerModule, AlbumGridComponent, NavBarComponent, AnnouncementBarComponent, FooterComponent]
})
export class AlbumGridPageComponent {}
