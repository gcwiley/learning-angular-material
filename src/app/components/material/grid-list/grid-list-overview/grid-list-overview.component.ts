import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-grid-list-overview',
  templateUrl: './grid-list-overview.component.html',
  styleUrls: ['./grid-list-overview.component.scss'],
  standalone: true,
  imports: [MatGridListModule],
})
export class GridListOverviewComponent {}
