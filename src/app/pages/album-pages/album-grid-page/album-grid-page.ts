import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import { NavBar, Footer } from '../../../components';

// album components
import { AlbumGrid } from '../../../albums';

@Component({
    selector: 'app-album-grid-page',
    templateUrl: './album-grid-page.html',
    styleUrl: './album-grid-page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatDividerModule, AlbumGrid, NavBar, Footer]
})
export class AlbumGridPage {}
