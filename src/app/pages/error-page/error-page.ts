import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBar, Footer } from '../../components';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.html',
    styleUrl: './error-page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavBar, Footer]
})
export class ErrorPage {}
