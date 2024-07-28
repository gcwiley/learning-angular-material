import { Component } from '@angular/core';

// import the angular logo
import { AppLogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  standalone: true,
  imports: [AppLogoComponent],
})
export class SupportComponent {}
