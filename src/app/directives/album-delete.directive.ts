import { Directive, EventEmitter, HostListener, Output, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, first, switchMap } from 'rxjs';

// import the album service
import { AlbumService } from '../services/album.service';

// import the confirm dialog service
import { CustomConfirmDialog, CustomConfirmDialogService } from '../services/custom-confirm-dialog.service';

@Directive({
   selector: '[appAlbumDelete]',
   standalone: true,
})
export class AlbumDeleteDirective {
   // sets up a required input that expects a string value and provides an alias 'appAlbumDelete; to be used when the directive is being used.
   public id = input.required<string>({ alias: 'appAlbumDelete' });
   // Output() decorator that marks a property as an output, which mean it will emit events
   // declares a public property called 'deleted' and creates a new EventEmitter that emits string values
   @Output() public deleted = new EventEmitter<string>();

   // initializes the directive dependencies
   constructor(private albumService: AlbumService, private confirm: CustomConfirmDialogService, private snackbar: MatSnackBar) {}

   @HostListener('click')
   // method is executed when a click event is detected on the host element
   public onClick(): void {
      // opens a custom confirmation dialog of type Delete
      this.confirm
         .openCustomConfirmDialog(CustomConfirmDialog.Delete)
         // .pipe method combines multiple operators
         .pipe(
            // gets the first emission from the custom confirm dialog
            first(),
            // filters the dialog's result, so that it's true only if the dialog result is true
            filter((res) => !!res),
            // this maps the true result to a new observable that calls 'deleteAlbumById'
            switchMap(() => this.albumService.deleteAlbum(this.id()))
         )
         .subscribe({
            next: () => {
               // when data is emitted, it emits the deleted event
               this.deleted.emit(this.id());
               // opens a success snackbar
               this.snackbar.open('Success', 'Close', { duration: 3000 });
            },
            // if the deletion fails, it opens a 'failed' snackbar
            error: () => {
               this.snackbar.open('Failed', 'Close', { duration: 3000 });
            },
         });
   }
}
