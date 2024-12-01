import { Component } from '@angular/core';

// import angular material modules

// import the shared components
import { NavBarComponent, FooterComponent } from '../../shared';

@Component({
   standalone: true,
   selector: 'app-error-page',
   templateUrl: './error-page.component.html',
   styleUrl: './error-page.component.scss',
   imports: [NavBarComponent, FooterComponent],
})
export class ErrorPageComponent {}
