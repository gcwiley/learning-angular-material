import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

// rxjs
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

// angular material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// image service and interface
import { ImageService } from '../../services/image.service';
import { Image } from '../../types/image.interface';

@Component({
  standalone: true,
  selector: 'app-image-grid-page',
  templateUrl: './image-grid.html',
  styleUrls: ['./image-grid.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatGridListModule, MatProgressSpinnerModule, AsyncPipe],
})
export class ImageGrid implements OnInit, OnDestroy {
  // inject dependencies
  private imageService = inject(ImageService);
  private breakpointObserver = inject(BreakpointObserver);

  // observables for AsyncPipe
  public images!: Observable<Image[]>;
  // observable for columns based on breakpoints
  public cols!: Observable<number>;

  // static grid properties
  rowHeight = '1:1';
  gutterSize = '0px';
  colspan = 1;
  rowspan = 1;

  // lifecycle management - subject to manage subscription cleanup
  private destroy = new Subject<void>();

  public ngOnInit(): void {
    this.images = this.imageService.getImages().pipe(
      catchError(() => {
        // optionally, set the error flag or return an empty array
        return of([]);
      })
    );

    this.cols = this.breakpointObserver
      .observe([
        // define breakpoints to observe
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        takeUntil(this.destroy),
        map((state: BreakpointState) => {
          // map breakpoints state to number of columns
          if (state.breakpoints[Breakpoints.XSmall]) {
            return 1; // e.g. handset portrait
          }
          if (state.breakpoints[Breakpoints.Small]) {
            return 2; // e.g. handset landscape / tablet portrait
          }
          if (state.breakpoints[Breakpoints.Medium]) {
            return 3; // e.g. tablet landscape
          }
          // default for large/x-large or none of the above match
          return 4;
        })
      );
  }

  public ngOnDestroy(): void {
    // signal component destruction
    this.destroy.next();
    this.destroy.complete();
  }
}
