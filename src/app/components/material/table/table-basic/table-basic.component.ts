import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { ELEMENT_DATA } from '../../../../../assets/data/element-data';

@Component({
  selector: 'app-table-basic',
  styleUrls: ['table-basic.component.scss'],
  templateUrl: 'table-basic.component.html',
  standalone: true,
  imports: [MatTableModule],
})
export class TableBasicComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource = ELEMENT_DATA;
}
