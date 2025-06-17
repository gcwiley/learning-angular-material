import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// angular material
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// ablum service and interface
import { AlbumService } from '../../services/album.service';
import { Album } from '../../types/album.interface';

@Component({
   standalone: true,
    selector: 'app-album-table',
    templateUrl: './album-table.component.html',
    styleUrl: './album-table.component.scss',
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
export class AlbumTableComponent implements AfterViewInit {
   // setup pagination for table
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   // set up sort in table
   @ViewChild(MatSort) sort!: MatSort;

   // set the loading spinner to true
   isLoadingResults = true;

   // set up the data source
   dataSource = new MatTableDataSource<Album>();

   // columns to display
   columnsToDisplay = [
      'title',
      'artist',
      'releaseDate',
      'genre',
      'createdAt',
      'updatedAt',
      'openAlbum',
      'editAlbum',
      'deleteAlbum',
      'openDialog',
   ];

   constructor(private albumService: AlbumService, private router: Router) {}

   // A callback method that is invoked immediately after Angular has completed initialization of a component's view.
   public ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getAlbums();
   }

   // gets all heroes from hero service
   public getAlbums(): void {
      this.albumService.getAlbums().subscribe((albums) => {
         this.dataSource.data = albums;
         this.isLoadingResults = false;
      });
   }
}

