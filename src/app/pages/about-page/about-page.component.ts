import { ChangeDetectionStrategy, Component } from '@angular/core';

// import the shared components
import { NavBarComponent, FooterComponent } from '../../components';

// import the typography component - as a test
import { TypographyComponent } from '../../test/typography/typography.component';

@Component({
    standalone: true,
    selector: 'app-about-page',
    templateUrl: './about-page.component.html',
    styleUrl: './about-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavBarComponent, FooterComponent, TypographyComponent]
})
export class AboutPageComponent {}
