import { AfterViewInit, Component, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import mat paginator and mat sort
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// import mat dialog here
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

// import the hero service
import { HeroService } from '../../services/hero.service';

// import the hero interface
import { Hero } from '../../types/hero.interface';

@Component({
    selector: 'app-hero-table',
    templateUrl: './hero-table.component.html',
    styleUrls: ['./hero-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatRippleModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        RouterModule,
        MatPaginator,
    ]
})
export class HeroTableComponent implements AfterViewInit {
   // inject MatDialog
   readonly dialog = inject(MatDialog);

   // setup pagination for table
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   // set up sort in table
   @ViewChild(MatSort) sort!: MatSort;

   // set the loading spinner to true
   isLoadingResults = true;

   // set up the data source
   dataSource = new MatTableDataSource<Hero>();

   // columns to display
   columnsToDisplay = ['name', 'age', 'homePlanet', 'openHero', 'editHero', 'deleteHero', 'openDialog'];

   constructor(private heroService: HeroService, private router: Router) {}

   // a callback method that is invoked immediately after angular has completed initialization of a component's view
   ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getHeroes();
   }

   // gets all heroes from the hero service
   getHeroes(): void {
      this.heroService.getHeroes().subscribe((heroes) => {
         this.dataSource.data = heroes;
         // set the loading results to false
         this.isLoadingResults = false;
      });
   }

   // open dialog window
   openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(HeroTableDialogComponent, {
         width: '250px',
         enterAnimationDuration,
         exitAnimationDuration,
      });
   }

   // deletes a hero by ID
   onDeleteHero(id: string): void {
      this.heroService.deleteHero(id).subscribe(() => {
         // navigates admin back to the admin page
         this.router.navigateByUrl('/admin');
      });
   }
}

@Component({
    selector: 'app-hero-table-dialog',
    templateUrl: './hero-table-dialog.html',
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroTableDialogComponent {
   readonly dialogRef = inject(MatDialogRef<HeroTableDialogComponent>);
}
