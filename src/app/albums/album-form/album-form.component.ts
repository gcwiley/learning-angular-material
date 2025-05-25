import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// rxjs
import { first } from 'rxjs';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// album service and interface
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
    CommonModule,
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

  genres: AlbumGenre[] = ALBUM_GENRES;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private albumService: AlbumService,
    private snackBar: MatSnackBar
  ) {}

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
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id')!;
        this.albumService.getAlbumById(this.id!).subscribe((album) => {
          this.album = album;
          // overrides the value of initial form controls
          this.albumForm.setValue({
            // set the value of the form controls
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
      this.albumService.addAlbum(this.albumForm.value as AlbumInput).subscribe(() => {
        // naivates user back to the home page
        this.router.navigateByUrl('/admin');
      });
    } else {
      this.albumService.updateAlbumById(this.id!, this.albumForm.value as AlbumInput).subscribe(() => {
        // navigates user back to the home page
        this.router.navigateByUrl('/admin');
      });
    }
  }

  // reset the form
  public onReset(event: Event): void {
    event.preventDefault();
    this.albumForm.reset();
  }
}
