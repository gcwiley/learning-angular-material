import { Component } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

// shared components
import {
  NavBar,
  Clock,
  Menu,
  Calendar,
  Hero,
  Footer,
} from '../../components/index';

// post components
import { PostGrid, RecentPosts } from '../../posts';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    NavBar,
    Calendar,
    Clock,
    Menu,
    Footer,
    Hero,
    PostGrid,
    RecentPosts,
  ],
})
export class Homepage {}
