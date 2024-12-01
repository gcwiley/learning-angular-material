import { Component } from '@angular/core';

// import the shared components
import { NavBarComponent, FooterComponent } from '../../shared';

// import the typography component - as a test
import { TypographyComponent } from '../../components/typography/typography.component';

@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html',
    styleUrl: './about-page.component.scss',
    imports: [NavBarComponent, FooterComponent, TypographyComponent]
})
export class AboutPageComponent {}
