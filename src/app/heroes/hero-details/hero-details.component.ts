import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// angular material
import { MatListModule } from '@angular/material/list';

// hero service and interface
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../types/hero.interface';

@Component({
    standalone: true,
    selector: 'app-hero-details',
    templateUrl: './hero-details.component.html',
    styleUrls: ['./hero-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatListModule]
})
export class HeroDetailsComponent implements OnInit {
  hero!: Hero

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
