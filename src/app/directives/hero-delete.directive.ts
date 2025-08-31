import { Directive, EventEmitter, HostListener, Output, input, inject } from '@angular/core';

// rxjs
import { filter, first, switchMap, catchError, throwError } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// hero and confirm dialog service
import { HeroService } from '../services/hero.service';

// custom dialog service
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
  private readonly snackBarDuration = 5000;

  @Output() public deleted = new EventEmitter<string>();

  // initializes the directive dependencies
  private heroService = inject(HeroService);
  private confirm = inject(CustomConfirmDialogService);
  private snackBar = inject(MatSnackBar);

  @HostListener('click')
  public onClick(): void {
    // opens a custom confirmation dialog of type Delete
    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        first(),
        filter((confirmed) => !!confirmed),
        switchMap(() => this.heroService.deleteHeroById(this.id())),
        catchError((error) => {
          // error checking code
          console.error('Error deleting hero:', error); // log the error
          this.snackBar.open('Unable to delete hero.', 'Close', { duration: this.snackBarDuration});
          return throwError(() => new Error('Unable to delete hero.')); // re-throw a new error 
        })
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          this.snackBar.open('Hero deleted successfully.', 'Close', { duration: 5000 });
        },
      });
  }
}
