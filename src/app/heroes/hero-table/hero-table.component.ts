import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import the hero service
import { HeroService } from '../../services/hero.service';

// import the hero interface
import { Hero } from '../../types/hero.interface';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
} )
export class HeroTableComponent implements OnInit {
  isLoadingResults = true;

  // set up the data source
  dataSource = new MatTableDataSource<Hero>();

  // columns to display
  columnsToDisplay = ['name', 'age', 'homePlanet', 'openHero', 'editHero', 'deleteHero'];

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
      this.getHeroes()
  }

  // gets all heroes from the hero service
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.dataSource.data = heroes;
      this.isLoadingResults = false;
    });
  }
 
  // deletes a hero by ID
  onDeleteHero(id: string): void {
    this.heroService.deleteHero(id).subscribe(() => {
      // navigates admin back to the admin page
      this.router.navigateByUrl('/admin')
    })
  }
}
