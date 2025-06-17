import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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

// hero service and interface
import { HeroService } from '../../services/hero.service';
import { Hero, HeroInput } from '../../types/hero.interface';

@Component({
  standalone: true,
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
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
    ReactiveFormsModule
],
})
export class HeroFormComponent implements OnInit {
  public mode = 'create';
  private id!: string;
  private hero!: Hero;

  // create the hero form
  heroForm = this.formBuilder.group({
    name: ['', Validators.required],
    alterEgo: ['', Validators.required],
    placeOfOrigin: ['', Validators.required],
    abilities: ['', Validators.required],
    biography: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private heroService: HeroService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    // find out if we have a "id" or not
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id')!;
        this.heroService.getHeroById(this.id).subscribe((hero) => {
          this.hero = hero;
          // overrides values of initial form controls
          this.heroForm.setValue({
            // set value for every form control
            name: this.hero.name,
            alterEgo: this.hero.alterEgo,
            placeOfOrigin: this.hero.placeOfOrigin,
            abilities: this.hero.abilities,
            biography: this.hero.biography,
          });
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  // saves a new hero
  public onSaveHero(): void {
    if (this.mode === 'create') {
      this.heroService
        .addHero(this.heroForm.value as HeroInput)
        .pipe(first())
        .subscribe({
          next: (hero) => {
            // reset the hero form
            this.heroForm.reset(hero);
            // display a success message
            this.snackBar.open('Hero created', 'CLOSE', {
              duration: 5000,
            });
            // navigates user back to homepage
            this.router.navigateByUrl('/');
          },
          error: () => {
            this.snackBar.open('Error creating hero', 'CLOSE', {
              duration: 5000,
            });
          },
        });
    } else {
      this.heroService.updateHeroById(this.id!, this.heroForm.value as HeroInput).subscribe({
        next: (hero) => {
          // reset the hero form
          this.heroForm.reset(hero);
          // display a success message
          this.snackBar.open('Hero updated', 'CLOSE', {
            duration: 5000,
          });
          // navigates user back to homepage
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.snackBar.open('Error updating hero.', 'CLOSE', {
            duration: 5000,
          });
        },
      });
    }
  }

  // reset the hero form
  public onReset(event: Event): void {
    event.preventDefault();
    this.heroForm.reset();
  }
}
