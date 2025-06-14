import { Directive, EventEmitter, HostListener, Output, input } from '@angular/core';
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
  selector: '[appHeroDelete]',
  standalone: true,
})
export class HeroDeleteDirective {
  public id = input.required<string>({ alias: 'appHeroDelete' });

  @Output() public deleted = new EventEmitter<string>();

  // initializes the directive dependencies
  constructor(
    private heroService: HeroService,
    private confirm: CustomConfirmDialogService,
    private snackbar: MatSnackBar
  ) {}

  @HostListener('click')
  public onClick(): void {
    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        first(), // this ensure the observable completes after the first value
        filter((res) => !!res),
        switchMap(() => this.heroService.deleteHeroById(this.id()))
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          // opens a success snackbar
          this.snackbar.open('Hero deleted successfully', 'Close', { duration: 5000 });
        },
        // if the deletion fails, it opens a 'failed' snackbar
        error: (error) => {
          // log error to console
          console.error('Unable to delete album:', error);
          this.snackbar.open('Unable to delete album', 'CLOSE', { duration: 5000 });
        },
      });
  }
}
