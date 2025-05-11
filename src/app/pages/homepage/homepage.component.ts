import { Component } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

// shared components
import {
  NavBarComponent,
  AnnouncementBarComponent,
  ClockComponent,
  CalendarComponent,
  ActionBarComponent,
  AuthStatusComponent,
  FooterComponent,
} from '../../components/index';

// post components
import { PostGridComponent, RecentPostsComponent } from '../../posts';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    NavBarComponent,
    AnnouncementBarComponent,
    CalendarComponent,
    ActionBarComponent,
    ClockComponent,
    FooterComponent,
    AuthStatusComponent,
    PostGridComponent,
    RecentPostsComponent,
  ],
})
export class HomepageComponent {}
