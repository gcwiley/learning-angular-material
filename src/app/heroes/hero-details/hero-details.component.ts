import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatListModule } from '@angular/material/list';

// import the hero interface
import { Hero } from '../../types/hero.interface';

// import the hero service
import { HeroService } from '../../services/hero.service';

@Component({
    selector: 'app-hero-details',
    templateUrl: './hero-details.component.html',
    styleUrls: ['./hero-details.component.scss'],
    imports: [CommonModule, MatListModule]
})
export class HeroDetailsComponent implements OnInit {
  hero!: Hero | undefined;

  constructor(private route: ActivatedRoute, private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHero();
  }

  // GET hero by ID
  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }
}
