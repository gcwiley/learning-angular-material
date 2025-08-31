import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// rxjs
import { first, take } from 'rxjs';

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
import { Post, PostInput, PostCategory } from '../../types/post.interface';

// import the post categories
import { POST_CATEGORIES } from '../../../assets/data/post-category';

@Component({
  standalone: true,
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
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
export class PostFormComponent implements OnInit {
  public mode = 'create';
  private id!: string;
  private post!: Post;

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
    // find out if an 'id' exists or not
    this.route.paramMap.pipe(take(1)).subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id')!;
        this.postService
          .getPostById(this.id!)
          .pipe(take(1))
          .subscribe((post) => {
            this.post = post;
            // overrides values of initial form controls
            this.postForm.setValue({
              title: this.post.title,
              author: this.post.author,
              body: this.post.body,
              category: this.post.category,
              favorite: this.post.favorite,
              date: this.post.date,
            });
          });
      } else {
        this.mode = 'create';
      }
    });
  }

  // saves a new post to database
  public onSavePost(): void {
    if (this.mode === 'create') {
      this.postService
        .addPost(this.postForm.value as PostInput)
        .pipe(first())
        .subscribe({
          next: () => {
            // display a success message
            this.snackBar.open('Post created', 'Close', {
              duration: 5000,
            });
            // navigates user back to homepage
            this.router.navigateByUrl('/');
          },
          error: () => {
            // display an error message
            this.snackBar.open('Error creating post', 'Close', {
              duration: 5000,
            });
          },
        });
    } else {
      this.postService.updatePostById(this.id!, this.postForm.value as PostInput).subscribe({
        next: () => {
          // display a success message
          this.snackBar.open('Post updated', 'Close', {
            duration: 5000,
          });
        },
        error: (error) => {
          console.error('Error updating post:', error);
          // display an error message
          this.snackBar.open('Error updating post.', 'Close', {
            duration: 5000,
          });
        },
      });
    }
  }

  // reset the post form
  public onReset(event: Event): void {
    event.preventDefault();
    this.postForm.reset();
  }
}
