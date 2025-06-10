import { Directive, EventEmitter, HostListener, Output, input } from '@angular/core';
import { filter, first, switchMap } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// album and confirm dialog service
import { AlbumService } from '../services/album.service';
import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  selector: '[appAlbumDelete]',
  standalone: true,
})
export class AlbumDeleteDirective {
  public id = input.required<string>({ alias: 'appAlbumDelete' });

  @Output() public deleted = new EventEmitter<string>();

  // initializes the directive dependencies
  constructor(
    private albumService: AlbumService,
    private confirm: CustomConfirmDialogService,
    private snackbar: MatSnackBar
  ) {}

  @HostListener('click')
  public onClick(): void {
    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        first(), // this ensures the observable completes after the first value
        filter((res) => !!res),
        switchMap(() => this.albumService.deleteAlbumById(this.id()))
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          // opens a success snackbar
          this.snackbar.open('Album deleted successfully', 'Close', { duration: 3000 });
        },
        // if the deletion fails, it opens a 'failed' snackbar
        error: (error) => {
          // log error to console
          console.error('Unable to delete album:', error);
          this.snackbar.open('Unable to delete album.', 'CLOSE', { duration: 5000 });
        },
      });
  }
}
