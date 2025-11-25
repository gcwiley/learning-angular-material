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

// post and confirm dialog service
import { PostService } from '../services/post.service';

// custom dialog service
import {
  CustomConfirmDialog,
  CustomConfirmDialogService,
} from '../services/custom-confirm-dialog.service';

@Directive({
  e: true,
  selector: '[appPostDelete]',
})
export class PostDeleteDirective {
  public id = input.required<string>({ alias: 'appPostDelete' });
  private readonly snackBarDuration = 5000;

  @Output() public deleted = new EventEmitter<string>();

  // initializes the directive dependencies
  private postService = inject(PostService);
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
        switchMap(() => this.postService.deletePostById(this.id())),
        catchError((error) => {
          // error checking code
          console.error('Error deleting post:', error); // log the error
          this.snackBar.open('Unable to delete post.', 'Close', {
            duration: this.snackBarDuration,
          });
          return throwError(() => new Error('Unable to delete post.')); // re-throw a new error
        })
      )
      .subscribe({
        next: () => {
          this.deleted.emit(this.id());
          this.snackBar.open('Post deleted successfully', 'Close', {
            duration: this.snackBarDuration,
          });
        },
      });
  }
}
