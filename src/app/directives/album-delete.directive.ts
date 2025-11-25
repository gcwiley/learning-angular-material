import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  input,
  inject,
} from '@angular/core';

// rxjs
import { filter, first, switchMap, catchError, throwError } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// album service
import { AlbumService } from '../services/album.service';

// custom dialog service
import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  selector: '[appAlbumDelete]',
})
export class AlbumDeleteDirective {
  public id = input.required<string>({ alias: 'appAlbumDelete' });
  private readonly snackBarDuration = 5000;

  @Output() public deleted = new EventEmitter<string>();

  // initializes the directive dependencies
  private albumService = inject(AlbumService);
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
        switchMap(() => this.albumService.deleteAlbumById(this.id())),
        catchError((error) => {
          console.error('Error deleting album:', error);
          this.snackBar.open('Unable to delete album.', 'Close', {
            duration: this.snackBarDuration,
          });
          return throwError(() => new Error('Unable to delete album.'));
        })
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          this.snackBar.open('Album deleted successfully', 'Close', {
            duration: this.snackBarDuration,
          });
        },
      });
  }
}
