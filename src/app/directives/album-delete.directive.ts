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

// album service
import { AlbumService } from '../services/album.service';

import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  selector: '[appAlbumDelete]',
})
export class AlbumDeleteDirective {
  public id = input.required<string>({ alias: 'appAlbumDelete' });

  public deleted = output<string>();

  private albumService = inject(AlbumService);
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
        switchMap(() => this.albumService.deleteAlbumById(this.id())),
        catchError((error) => {
          console.error('Error deleting album:', error);
          this.snackBar.open('Unable to delete album.', 'Close', {
            duration: this.snackBarDuration,
          });
          return EMPTY;
        }),
        finalize(() => this.isDeleting.set(false)),
      )
      .subscribe(() => {
        this.deleted.emit(this.id());
        this.snackBar.open('album successfully deleted.', 'Close', {
          duration: this.snackBarDuration,
        });
      });
  }
}
