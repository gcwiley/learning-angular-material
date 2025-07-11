import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';

// album list component
import { AlbumTableComponent } from '../../albums';

// heroes list component
import { HeroTableComponent } from '../../heroes';

@Component({
    standalone: true,
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltip,
    RouterModule,
    AlbumTableComponent,
    HeroTableComponent
]
})
export class AdminPageComponent {
   events: string[] = [];
   opened!: boolean;
}
