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

// album service and interfaces
import { AlbumService } from '../../services/album.service';
import { Album, AlbumInput, AlbumGenre } from '../../types/album.interface';

// album data values
import { ALBUM_GENRES } from '../../../assets/data/album-data';

@Component({
  standalone: true,
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrl: './album-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AlbumFormComponent implements OnInit {
  public mode = 'create';
  private id!: string;
  private album!: Album;
  private readonly snackBarDuration = 5000;

  genres: AlbumGenre[] = ALBUM_GENRES;

  // inject dependencies
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private albumService = inject(AlbumService);
  private snackBar = inject(MatSnackBar);

  // create the album form
  albumForm = this.formBuilder.group({
    title: ['', Validators.required],
    artist: ['', Validators.required],
    releaseDate: ['', Validators.required],
    label: ['', Validators.required],
    studio: ['', Validators.required],
    genre: ['', Validators.required],
    summary: ['', Validators.required],
  });

  ngOnInit(): void {
    // find out if we have an id in the url
    this.route.paramMap.pipe(take(1)).subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id')!;
        this.albumService
          .getAlbumById(this.id!)
          .pipe(take(1))
          .subscribe((album) => {
            this.album = album;
            // overrides the value of initial form controls
            this.albumForm.setValue({
              title: this.album.title,
              artist: this.album.artist,
              releaseDate: this.album.releaseDate,
              label: this.album.label,
              studio: this.album.studio,
              genre: this.album.genre,
              summary: this.album.summary,
            });
          });
      } else {
        this.mode = 'create';
      }
    });
  }

  // saves new album to database
  onSaveAlbum() {
    if (this.mode === 'create') {
      this.albumService
        .addAlbum(this.albumForm.value as AlbumInput)
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
      this.albumService.updateAlbumById(this.id!, this.albumForm.value as AlbumInput).subscribe({
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

  // reset the album form
  public onReset(event: Event): void {
    event.preventDefault();
    this.albumForm.reset();
  }
}
