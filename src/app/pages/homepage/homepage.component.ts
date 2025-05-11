import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  AppLogoComponent,
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
    RouterLink,
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
    AppLogoComponent,
    AuthStatusComponent,
    PostGridComponent,
    RecentPostsComponent,
    NgFor,
  ],
})
export class HomepageComponent {}
