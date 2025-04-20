import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBarComponent, AnnouncementBannerComponent, FooterComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBarComponent, AnnouncementBannerComponent, FooterComponent],
})
export class AboutPageComponent {}
