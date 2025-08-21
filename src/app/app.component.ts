import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// shared components
import { AuthStatusComponent, AnnouncementBarComponent } from './components';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, AuthStatusComponent, AnnouncementBarComponent],
})
export class AppComponent {
  title = 'Learning Angular Material';
}
