import { Component, inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FormValueContainer, CdkPopoverEditModule } from '@angular/cdk-experimental/popover-edit';
import { NgForm, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
