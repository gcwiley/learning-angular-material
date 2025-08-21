import { Directive, EventEmitter, HostListener, Output, input, inject } from '@angular/core';

// rxjs
import { filter, first, switchMap } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// post and confirm dialog service
import { PostService } from '../services/post.service';
import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  standalone: true,
  selector: '[appPostDelete]',
})
export class PostDeleteDirective {
  public id = input.required<string>({ alias: 'appPostDelete' });

  @Output() public deleted = new EventEmitter<string>();

  // inject dependencies
  private postService = inject(PostService);
  private confirm = inject(CustomConfirmDialogService);
  private snackBar = inject(MatSnackBar);

  @HostListener('click')
  public onClick(): void {
    this.confirm
      .openCustomConfirmDialog(CustomConfirmDialog.Delete)
      .pipe(
        first(), // this ensures the observable completes after the first value
        filter((res) => !!res),
        switchMap(() => this.postService.deletePostById(this.id()))
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          // opens a success snackbar
          this.snackBar.open('Post deleted successfully', 'Close', {
            duration: 5000,
          });
        },
        // if the deletion fails, open a 'failed' snackbar
        error: (error) => {
          console.error('Unable to delete post:', error);
          this.snackBar.open('Unable to delete post.', 'Close', {
            duration: 5000,
          });
        },
      });
  }
}
