import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

// import the angular material modules
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
   selector: 'app-table-http',
   templateUrl: './table-http.component.html',
   styleUrls: ['./table-http.component.scss'],
   standalone: true,
   imports: [MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatSortModule, DatePipe],
})
export class TableHttpComponent implements AfterViewInit {
   displayedColumns: string[] = ['created', 'state', 'number', 'title'];
   exampleDatabase!: ExampleHttpDatabase | null;
   data: GithubIssue[] = [];

   resultsLength = 0;
   isLoadingResults = true;
   isRateLimitReached = false;

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

   constructor(private _httpClient: HttpClient) {}

   ngAfterViewInit() {
      this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

      // if the user changes the sort order, reset back to the first page
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

      merge(this.sort.sortChange, this.paginator.page).pipe(
         startWith({}),
         switchMap(() => {
            this.isLoadingResults = true;
            return this.exampleDatabase!.getRepoIssues(
               this.sort.active,
               this.sort.direction,
               this.paginator.pageIndex
            ).pipe(catchError(() => observableOf(null)));
         }),
         map((data) => {
            // flip flag to show that loading has finished
            this.isLoadingResults = false;
            this.isRateLimitReached = data === null;

            if (data === null) {
               return [];
            }

            // only refresh the result lenght if there is new data. in case of rate limit
            // errors, we do not want to reset the paginator to zero, as that would
            // prevent users from re-triggering requests.
            this.resultsLength = data.total_count;
            return data.items;
         })
      );
   }
}

export interface GithubApi {
   items: GithubIssue[];
   total_count: number;
}

export interface GithubIssue {
   created_at: string;
   number: string;
   state: string;
   title: string;
}

// an example database that the data source uses to retrieve data for the table
export class ExampleHttpDatabase {
   constructor(private _httpClient: HttpClient) {}

   getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
      const href = 'https://api.github.com/search/issues';
      const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

      return this._httpClient.get<GithubApi>(requestUrl);
   }
}
