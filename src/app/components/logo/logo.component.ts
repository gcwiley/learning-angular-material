import { Component, HostBinding } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class AppLogoComponent {
  // use the host binding decorator
  @HostBinding('attr.aria-hidden')
  ariaHidden = true;
}
