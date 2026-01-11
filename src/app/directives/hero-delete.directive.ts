import {
  Directive,
  HostListener,
  output,
  input,
  inject,
  DestroyRef,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap, catchError, finalize, EMPTY } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// hero service
import { HeroService } from '../services/hero.service';

import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  selector: '[appHeroDelete]',
})
export class HeroDeleteDirective {
  public id = input.required<string>({ alias: 'appHeroDelete' });

  public deleted = output<string>();

  private heroService = inject(HeroService);
  private confirm = inject(CustomConfirmDialogService);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  private isDeleting = signal(false); 
  private readonly snackBarDuration = 5000;

  @HostListener('click')
  public onClick(): void {
    if (this.isDeleting()) return; 
    this.isDeleting.set(true);

    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((confirmed) => !!confirmed),
        switchMap(() => this.heroService.deleteHeroById(this.id())),
        catchError((error) => {
          console.error('Error deleting hero:', error);
          this.snackBar.open('Unable to delete hero.', 'Close', {
            duration: this.snackBarDuration,
          });
          return EMPTY;
        }),
        finalize(() => this.isDeleting.set(false)),
      )
      .subscribe(() => {
        this.deleted.emit(this.id());
        this.snackBar.open('Hero successfully deleted.', 'Close', {
          duration: this.snackBarDuration,
        });
      });
  }
}
