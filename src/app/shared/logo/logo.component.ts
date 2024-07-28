import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: true,
})
export class AppLogoComponent {
  // use the host binding decorator
  @HostBinding('attr.aria-hidden')
  ariaHidden = true;
}
