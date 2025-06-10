import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBarComponent, FooterComponent } from '../../components';

@Component({
    standalone: true,
    selector: 'app-image-gallery-page',
    templateUrl: './gallery-page.component.html',
    styleUrls: ['./gallery-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ NavBarComponent, FooterComponent]
})
export class GalleryPageComponent {}
