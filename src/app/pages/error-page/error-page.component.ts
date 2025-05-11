import { Component } from '@angular/core';

// angular material

// import the shared components
import { NavBarComponent, AnnouncementBarComponent, FooterComponent } from '../../components';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrl: './error-page.component.scss',
    imports: [NavBarComponent, AnnouncementBarComponent, FooterComponent]
})
export class ErrorPageComponent {}
