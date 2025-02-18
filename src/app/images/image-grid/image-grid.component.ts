import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// import the angular material modules
import { MatGridListModule } from '@angular/material/grid-list';

// import the image interface
import { Image } from '../../types/image.interface';

@Component({
   standalone: true,
   selector: 'app-image-grid-page',
   templateUrl: './image-grid.component.html',
   styleUrls: ['./image-grid.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatGridListModule],
})
export class ImageGridComponent implements OnInit {
   // create member variables
   images: Image[] = [];

   // set up the grid list demensions
   cols = 4; // ammount of columns in the grid list
   rowHeight = '300px'; // row height
   gutterSize = '0px';

   // fix this!
   colspan = 1;
   rowspan = 1;

   constructor(private breakpointObserver: BreakpointObserver) {}

   // this method controls the responsiveness of the grid
   layoutChanges(): void {
      this.breakpointObserver
         .observe([Breakpoints.TabletPortrait, Breakpoints.TabletLandscape, Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
         .subscribe((result) => {
            // set the default values
            this.cols = 4;
            this.rowHeight = '300px';

            const breakpoints = result.breakpoints;

            // check to see if in table portrait mode
            if (breakpoints[Breakpoints.TabletPortrait]) {
               // set the number of cols to 1
               this.cols = 1;
            } else if (breakpoints[Breakpoints.HandsetPortrait]) {
               // set the number of cols to 1
               this.cols = 1;
               this.rowHeight = '300px';
            } else if (breakpoints[Breakpoints.HandsetLandscape]) {
               // set the number of cols to 1
               this.cols = 1;
            } else if (breakpoints[Breakpoints.TabletLandscape]) {
               // set the number of cols to 2
               this.cols = 2;
            }
         });
   }

   ngOnInit(): void {
      this.layoutChanges();
   }
}
