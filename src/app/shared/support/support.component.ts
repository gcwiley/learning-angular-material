import { Component } from '@angular/core';

// import the angular logo
import { AppLogoComponent } from '../logo/logo.component';

@Component({
  standalone: true,
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  imports: [AppLogoComponent],
})
export class SupportComponent {}
