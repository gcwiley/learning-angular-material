import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// import the shared components
import { NavBarComponent, FooterComponent } from '../../shared';

@Component({
    selector: 'app-image-gallery-page',
    templateUrl: './image-gallery-page.component.html',
    styleUrls: ['./image-gallery-page.component.scss'],
    imports: [CommonModule, NavBarComponent, FooterComponent]
})
export class ImageGalleryPageComponent {}
