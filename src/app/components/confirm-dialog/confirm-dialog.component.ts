import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
   title: string;
   content: string;
}

@Component({
   standalone: true,
   selector: 'app-confirm-dialog',
   templateUrl: './confirm-dialog.component.html',
   styleUrl: './confirm-dialog.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatDialogModule, MatButtonModule, MatDialogModule],
})
export class ConfirmDialogComponent {
   // inject dependencies
   public data = inject<ConfirmDialogComponent>(MAT_DIALOG_DATA);
   public dialogRef = inject<MatDialogRef<ConfirmDialogComponent>>(MatDialogRef);
}
