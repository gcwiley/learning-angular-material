import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavBarComponent, AnnouncementBarComponent, FooterComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBarComponent, AnnouncementBarComponent, FooterComponent],
})
export class AboutPageComponent {}
