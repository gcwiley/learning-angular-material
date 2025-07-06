import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// angular material
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// hero service and interface
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../types/hero.interface';

@Component({
  standalone: true,
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatRippleModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatPaginator,
  ],
})
export class HeroTableComponent implements AfterViewInit {
  // setup pagination for table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // set up sort in table
  @ViewChild(MatSort) sort!: MatSort;

  // set the loading spinner to true
  isLoadingResults = true;

  // set up the data source
  dataSource = new MatTableDataSource<Hero>();

  // columns to display
  columnsToDisplay = [
    'name',
    'age',
    'homePlanet',
    'openHero',
    'editHero',
    'deleteHero',
    'openDialog',
  ];

  // inject dependencies
  private heroService = inject(HeroService);
  private router = inject(Router);

  // a callback method that is invoked immediately after angular has completed initialization of a component's view
  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getHeroes();
  }

  // gets all heroes from the hero service
  public getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.dataSource.data = heroes;
      // set the loading results to false
      this.isLoadingResults = false;
    });
  }

  // deletes a hero by ID
  public onDeleteHero(id: string): void {
    this.heroService.deleteHeroById(id).subscribe(() => {
      // navigates admin back to the admin page
      this.router.navigateByUrl('/admin');
    });
  }
}
