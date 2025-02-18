import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// import angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// import the hero service
import { HeroService } from '../../services/hero.service';

// import the hero interface
import { Hero } from '../../types/hero.interface';

@Component({
   standalone: true,
    selector: 'app-hero-form',
    templateUrl: './hero-form.component.html',
    styleUrls: ['./hero-form.component.scss'],
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
    ]
})
export class HeroFormComponent implements OnInit {
   formBuilder = inject(FormBuilder)
   
   public mode = 'create';
   private id!: string | null;
   private hero!: Hero;

   constructor(
      private router: Router,
      public route: ActivatedRoute,
      private heroService: HeroService
   ) {}

   // create the hero form
   heroForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      homePlanet: ['', Validators.required],
      superPower: ['', Validators.required],
      biography: ['', Validators.required],
   });

   ngOnInit(): void {
      // find out if we have a "id" or not
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
         if (paramMap.has('id')) {
            this.mode = 'edit';
            this.id = paramMap.get('id');
            this.heroService.getHero(this.id).subscribe((hero) => {
               this.hero = hero;
               // overrides values of initial form controls
               this.heroForm.setValue({
                  // set value for every form control
                  name: this.hero.name,
                  age: this.hero.age,
                  homePlanet: this.hero.homePlanet,
                  superPower: this.hero.superPower,
                  biography: this.hero.biography,
               });
            });
         } else {
            this.mode = 'create';
            this.id = null;
         }
      });
   }

   onSaveHero(): void {
      if (this.mode === 'create') {
         this.heroService.addHero(this.heroForm.value).subscribe(() => {
            // navigates user back to the homepage
            this.router.navigateByUrl('/admin');
         });
      } else {
         this.heroService.updateHero(this.id!, this.heroForm.value).subscribe(() => {
            // navigates user back to the homepage
            this.router.navigateByUrl('/admin');
         });
      }
   }
}
