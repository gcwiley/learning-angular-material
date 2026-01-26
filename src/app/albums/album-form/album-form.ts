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

// album service and interfaces
import { AlbumService } from '../../services/album.service';
import { AlbumInput, AlbumGenre } from '../../types/album.interface';

// album data values
import { ALBUM_GENRES } from '../../../assets/data/album-data';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.html',
  styleUrl: './album-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
})
export class AlbumForm implements OnInit {
  public mode: 'create' | 'edit' = 'create';
  private id!: string | null;
  private readonly snackBarDuration = 5000;
  public isSaving = false;
  public submitted = false;

  genres: AlbumGenre[] = ALBUM_GENRES;

  // inject dependencies
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly albumService = inject(AlbumService);
  private readonly snackBar = inject(MatSnackBar);

  // create the album form
  albumForm = this.formBuilder.group({
    title: ['', Validators.required],
    artist: ['', Validators.required],
    releaseDate: [null as Date | null, Validators.required],
    label: ['', Validators.required],
    studio: ['', Validators.required],
    genre: ['', Validators.required],
    summary: ['', Validators.required],
  });

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        first(),
        switchMap((paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.mode = 'edit';
            this.id = paramMap.get('id');
            return this.albumService.getAlbumById(this.id!);
          } else {
            this.mode = 'create';
            return of(undefined);
          }
        })
      )
      .subscribe((album) => {
        if (album) {
          // use patchValue for safety, and map the data correctly
          this.albumForm.patchValue({
            ...album,
            releaseDate: album.releaseDate ? new Date(album.releaseDate).toISOString() : '',
          });
        }
      });
  }

  // saves new album to database
  public onSaveAlbum() {
    // error checking
    if (!this.albumForm.valid) {
      return;
    }

    const formValue = this.albumForm.value as AlbumInput;

    if (this.mode === 'create') {
      this.albumService
        .addAlbum(formValue)
        .pipe(first())
        .subscribe({
          next: () => {
            this.snackBar.open('Album successfully created.', 'Close', {
              duration: this.snackBarDuration,
            });
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            console.error('Error creating album:', error);
            this.snackBar.open('Error creating album.', 'Close', {
              duration: this.snackBarDuration,
            });
          },
        });
    } else {
      this.albumService.updateAlbumById(this.id!, formValue).subscribe({
        next: () => {
          this.snackBar.open('Album updated.', 'Close', {
            duration: this.snackBarDuration,
          });
        },
        error: (error) => {
          console.error('Error updating album:', error);
          this.snackBar.open('Error updating album.', 'Close', {
            duration: this.snackBarDuration,
          });
        },
      });
    }
  }

  // cancels out of the form and return to album details page
  public onCancel(): void {
    this.router.navigateByUrl(this.mode === 'edit' ? `/albums/${this.id}` : '/');
  }
}
