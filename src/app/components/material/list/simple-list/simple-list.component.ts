import { Component } from '@angular/core';

// import the angular material module
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.css'],
  standalone: true,
  imports: [MatListModule],
})
export class SimpleListComponent {}
