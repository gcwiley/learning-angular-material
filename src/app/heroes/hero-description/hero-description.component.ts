import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

// hero interface
import { Hero } from '../../types/hero.interface';

// hero service
import { HeroService } from '../../services/hero.service';

@Component({
   standalone: true,
   selector: 'app-hero-description',
   templateUrl: './hero-description.component.html',
   styleUrls: ['./hero-description.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [NgIf],
})
export class HeroDescriptionComponent implements OnInit {
   hero!: Hero;

   constructor(private route: ActivatedRoute, private heroService: HeroService) {}

   ngOnInit(): void {
      this.getHero();
   }

   // GET hero by ID
   getHero(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.heroService.getHeroById(id).subscribe((hero) => (this.hero = hero));
   }
}
