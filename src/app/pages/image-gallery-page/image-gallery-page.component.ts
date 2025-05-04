import { Component } from '@angular/core';

// shared components
import { NavBarComponent, FooterComponent } from '../../components';

@Component({
    selector: 'app-image-gallery-page',
    templateUrl: './image-gallery-page.component.html',
    styleUrls: ['./image-gallery-page.component.scss'],
    imports: [ NavBarComponent, FooterComponent]
})
export class ImageGalleryPageComponent {}
