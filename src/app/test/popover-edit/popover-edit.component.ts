import { Component, inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

export type ElementType = 'Metal' | 'Semimetal' | 'Nonmental';

export type FantasyElement =
   | 'Earth'
   | 'Water'
   | 'Wind'
   | 'Fire'
   | 'Light'
   | 'Dark';

export interface PeriodicElement {
   name: string;
   type: ElementType;
   position: number;
   weight: number;
   symbol: string;
   fantasyCounterParts: FantasyElement[];
}

@Component({
   standalone: true,
   selector: 'app-popover-edit',
   templateUrl: './popover-edit.component.html',
   styleUrl: './popover-edit.component.scss',
   imports: [],
})
export class PopoverEditComponent {}
