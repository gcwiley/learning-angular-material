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

// image service
import { ImageService } from '../services/image.service';

import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  selector: '[appImageDelete]',
})
export class ImageDeleteDirective {
  public id = input.required<string>({ alias: 'appImageDelete' });

  public deleted = output<string>();

  private imageService = inject(ImageService);
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
        switchMap(() => this.imageService.deleteImageById(this.id())),
        catchError((error) => {
          console.error('Error deleting image:', error);
          this.snackBar.open('Unable to delete image.', 'Close', {
            duration: this.snackBarDuration,
          });
          return EMPTY;
        }),
        finalize(() => this.isDeleting.set(false)),
      )
      .subscribe(() => {
        this.deleted.emit(this.id());
        this.snackBar.open('Image successfully deleted.', 'Close', {
          duration: this.snackBarDuration,
        });
      });
  }
}
