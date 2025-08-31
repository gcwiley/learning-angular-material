import { Component } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

// shared components
import {
  NavBarComponent,
  ClockComponent,
  MenuComponent,
  CalendarComponent,
  HeroComponent,
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
    CalendarComponent,
    ClockComponent,
    MenuComponent,
    FooterComponent,
    HeroComponent,
    PostGridComponent,
    RecentPostsComponent,
  ],
})
export class HomepageComponent {}
