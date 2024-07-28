import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar-multirow',
  templateUrl: './toolbar-multirow.component.html',
  styleUrls: ['./toolbar-multirow.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatToolbarModule],
})
export class ToolbarMultirowComponent {}
