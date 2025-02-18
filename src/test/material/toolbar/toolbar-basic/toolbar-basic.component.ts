import { Component } from '@angular/core';

// import material modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar-basic',
  templateUrl: './toolbar-basic.component.html',
  styleUrls: ['./toolbar-basic.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
})
export class ToolbarBasicComponent {}
