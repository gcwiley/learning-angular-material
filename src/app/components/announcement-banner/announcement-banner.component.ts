import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
   standalone: true,
   selector: 'app-announcement-banner',
   templateUrl: './announcement-banner.component.html',
   styleUrls: ['./announcement-banner.component.scss'],
   imports: [],
})
export class AnnouncementBannerComponent implements OnDestroy {
   destroyed = new Subject<void>();
   currentScreenSize!: string;

   // Create a map to display breakpoint names for demonstration purposes.
   displayNameMap = new Map([
      [Breakpoints.XSmall, 'XSmall'],
      [Breakpoints.Small, 'Small'],
      [Breakpoints.Medium, 'Medium'],
      [Breakpoints.Large, 'Large'],
      [Breakpoints.XLarge, 'XLarge'],
   ]);

   constructor(breakpointObserver: BreakpointObserver) {
      breakpointObserver
         .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
         .pipe(takeUntil(this.destroyed))
         .subscribe((result) => {
            for (const query of Object.keys(result.breakpoints)) {
               if (result.breakpoints[query]) {
                  this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
               }
            }
         });
   }

   // a callback method that preforms clean up
   ngOnDestroy(): void {
      this.destroyed.next();
      this.destroyed.complete();
   }
}
