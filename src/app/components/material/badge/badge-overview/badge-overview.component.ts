import { Component } from '@angular/core';

@Component({
  selector: 'app-badge-overview',
  templateUrl: './badge-overview.component.html',
  styleUrls: ['badge-overview.component.scss'],
  standalone: true,
})
export class BadgeOverviewComponent {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
