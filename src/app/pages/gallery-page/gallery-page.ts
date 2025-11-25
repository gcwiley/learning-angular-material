import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBar, Footer } from '../../components';

@Component({
    selector: 'app-image-gallery-page',
    templateUrl: './gallery-page.html',
    styleUrls: ['./gallery-page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ NavBar, Footer]
})
export class GalleryPage {}
