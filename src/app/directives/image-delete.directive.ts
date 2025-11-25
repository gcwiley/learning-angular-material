import { Directive, EventEmitter, HostListener, Output, input, inject } from '@angular/core';

// rxjs
import { filter, first } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// image and confirm dialog service
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
  @Output() public deleted = new EventEmitter<string>();

  // inject dependencies
  private imageService = inject(ImageService);
  private confirm = inject(CustomConfirmDialogService);
  private snackBar = inject(MatSnackBar);

  // fix this!
  @HostListener('click')
  public onClick(): void {
    this.confirm.openCustomConfirmDialog(CustomConfirmDialog.Delete).pipe(
      first(),
      filter((res) => !!res)
    );
  }
}
