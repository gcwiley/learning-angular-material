import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import angular material modules
import { MatButtonModule } from '@angular/material/button';

// import the shared components
import { NavBarComponent, FooterComponent } from '../../shared';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.scss'],
    imports: [CommonModule, RouterModule, MatButtonModule, NavBarComponent, FooterComponent]
})
export class NotFoundPageComponent {}
