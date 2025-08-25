import { Directive, EventEmitter, HostListener, Output, input, inject } from '@angular/core';
import { filter, first, switchMap } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// hero and confirm dialog service
import { HeroService } from '../services/hero.service';
import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  standalone: true,
  selector: '[appHeroDelete]',
})
export class HeroDeleteDirective {
  public id = input.required<string>({ alias: 'appHeroDelete' });
  @Output() public deleted = new EventEmitter<string>();

  // initializes the directive dependencies
  private heroService = inject(HeroService);
  private confirm = inject(CustomConfirmDialogService);
  private snackBar = inject(MatSnackBar);

  @HostListener('click')
  public onClick(): void {
    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        first(),
        filter((confirmed) => !!confirmed),
        switchMap(() => this.heroService.deleteHeroById(this.id()))
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          this.snackBar.open('Hero deleted successfully', 'Close', { duration: 5000 });
        },
        // if the deletion fails, it opens a 'failed' snackbar
        error: (error) => {
          console.error('Unable to delete album:', error);
          this.snackBar.open('Unable to delete album', 'Close', { duration: 5000 });
        },
      });
  }
}
