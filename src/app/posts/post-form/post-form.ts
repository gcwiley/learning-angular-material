import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// rxjs
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// post service and interface
import { PostService } from '../../services/post.service';
import { PostInput, PostCategory } from '../../types/post.interface';

// import the post categories
import { POST_CATEGORIES } from '../../../assets/data/post-category';

@Component({
  standalone: true,
  selector: 'app-post-form',
  templateUrl: './post-form.html',
  styleUrl: './post-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class PostForm implements OnInit {
  public mode: 'create' | 'edit' = 'create';
  private id!: string | null;
  private readonly snackBarDuration = 5000;

  categories: PostCategory[] = POST_CATEGORIES;

  // inject dependencies
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private snackBar = inject(MatSnackBar);

  // create the post form
  postForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    body: ['', Validators.required],
    category: ['', Validators.required],
    favorite: [false, Validators.required],
    date: ['', Validators.required],
  });

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        first(),
        switchMap((paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.mode = 'edit';
            this.id = paramMap.get('id');
            return this.postService.getPostById(this.id!);
          } else {
            this.mode = 'create';
            return of(undefined);
          }
        })
      )
      .subscribe((post) => {
        if (post) {
          this.postForm.patchValue({
            ...post,
            date: post.date ? new Date(post.date).toISOString() : '',
          });
        }
      });
  }

  // saves a new post to database
  public onSavePost(): void {
    // error checking
    if (!this.postForm.valid) {
      return;
    }

    const formValue = this.postForm.value as PostInput

    if (this.mode === 'create') {
      this.postService
        .addPost(formValue)
        .pipe(first())
        .subscribe({
          next: () => {
            this.snackBar.open('Post successfully created.', 'Close', {
              duration: this.snackBarDuration,
            });
            this.router.navigateByUrl('/');
          },
          error: () => {
            this.snackBar.open('Error creating post.', 'Close', {
              duration: this.snackBarDuration,
            });
          },
        });
    } else {
      this.postService.updatePostById(this.id!, this.postForm.value as PostInput).subscribe({
        next: () => {
          this.snackBar.open('Post successfully updated', 'Close', {
            duration: this.snackBarDuration,
          });
        },
        error: (error) => {
          console.error('Error updating post:', error);
          this.snackBar.open('Error updating post.', 'Close', {
            duration: this.snackBarDuration,
          });
        },
      });
    }
  }

  // cancels out of the form and returns to post details page
  public onCancel(): void {
    this.router.navigateByUrl(this.mode === 'edit' ? `/posts/${this.id}` : '/');
  }
}
