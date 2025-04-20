import { Component } from '@angular/core';

// angular material

// import the shared components
import { NavBarComponent, AnnouncementBannerComponent, FooterComponent } from '../../components';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrl: './error-page.component.scss',
    imports: [NavBarComponent, AnnouncementBannerComponent, FooterComponent]
})
export class ErrorPageComponent {}
