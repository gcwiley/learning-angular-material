import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// post service and interface
import { }

@Component({
  standalone: true,
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrl: './recent-posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentPostsComponent implements OnInit {
  public recentPosts$!:
}
