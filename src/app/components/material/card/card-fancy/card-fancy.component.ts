import { Component } from '@angular/core';
// import material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-fancy',
  templateUrl: './card-fancy.component.html',
  styleUrls: ['./card-fancy.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
})
export class CardFancyComponent {}
