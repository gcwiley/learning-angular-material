import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router, RouterModule } from '@angular/router';

// import the angular material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule, MatCardAppearance } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

// import the album service
import { AlbumService } from '../../services/album.service';

// import the album type
import { Album } from '../../types/album.interface';

@Component({
    selector: 'app-album-grid',
    templateUrl: './album-grid.component.html',
    styleUrl: './album-grid.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [CommonModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatCheckboxModule]
})
export class AlbumGridComponent implements OnInit {
   // create the member variables
   albums: Album[] = [];

   // comment here
   appearance: MatCardAppearance = 'raised';

   // set up the grid list demensions
   cols = 4; // amount of columns in the grid list
   rowHeight = '1:1'; // row height
   gutterSize = '0px';

   // set up the grid list dimensions
   colspan = 1;
   rowspan = 1;

   constructor(private albumService: AlbumService, private breakpointObserver: BreakpointObserver, private router: Router) {}

   ngOnInit(): void {
      this.getAlbums();
      this.layoutChanges();
   }

   // comment
   toggleAppearance() {
      this.appearance = this.appearance === 'raised' ? 'outlined' : 'raised';
   }

   // responsive code
   layoutChanges(): void {
      this.breakpointObserver
         .observe([Breakpoints.TabletPortrait, Breakpoints.TabletLandscape, Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
         .subscribe((result) => {
            const breakpoints = result.breakpoints;

            // check to see if viewport is in table portrait mode
            if (breakpoints[Breakpoints.TabletPortrait]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.HandsetPortrait]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.HandsetLandscape]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.TabletLandscape]) {
               this.cols = 2;
            }
         });
   }

   // get all albums from the database
   getAlbums(): void {
      this.albumService.getAlbums().subscribe((albums) => {
         this.albums = albums; // update the albums array when data is loaded
      });
   }
}
