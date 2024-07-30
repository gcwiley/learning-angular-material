import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// import the message service
import { MessageService } from './message.service';

// import the album interface
import { Album } from '../types/album.interface';

@Injectable({
   providedIn: 'root',
})
export class AlbumService {
   private albumsUrl = '/api/albums'; // URL to web api

   httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
      }),
   };
   // inject 'HttpClient" in the Album service
   constructor(private http: HttpClient, private messageService: MessageService) {}

   // GET: albums from the database
   getAlbums(): Observable<Album[]> {
      return this.http.get<Album[]>(this.albumsUrl).pipe(
         tap(() => this.log('fetched albums')),
         catchError(this.handleError<Album[]>('getAlbums', []))
      );
   }

   // GET: album by ID from the database
   getAlbum(id: string | null): Observable<Album> {
      const url = `${this.albumsUrl}/${id}`;
      return this.http.get<Album>(url);
   }

   // GET: search albums in the database - SEARCH FIX THIS!!
   searchAlbums(term: string): Observable<Album[]> {
      if (!term.trim()) {
         // if no search term, return empty hero array
         return of([]);
      }
      return this.http.get<Album[]>(`${this.albumsUrl}/?name=${term}`).pipe(
         tap((x) =>
            x.length ? this.log(`found albums matching "${term}"`) : this.log(`no albums matching "${term}"`)
         ),
         catchError(this.handleError<Album[]>('search albums', []))
      );
   }

   // GET: album count from database
   getAlbumCount(): Observable<number> {
      return this.http.get<number>('/api/album-count');
   }

   // GET: recent album created in database
   getRecentlyCreatedAlbums(): Observable<Album[]> {
      return this.http.get<Album[]>('/api/recent-albums');
   }

   // SAVE METHODS

   // POST: Add a new Album to the server
   addAlbum(newAlbum: Album | object): Observable<Album> {
      return this.http.post<Album>(this.albumsUrl, newAlbum, this.httpOptions).pipe(
         tap((newAlbum: Album) => this.log(`added album with id=${newAlbum.id}`)),
         catchError(this.handleError<Album>('add Hero'))
      );
   }

   // DELETE: album by Id from the server
   deleteAlbum(id: string): Observable<Album> {
      const url = `${this.albumsUrl}/${id}`;

      return this.http.delete<Album>(url, this.httpOptions).pipe(
         tap(() => this.log(`deleted album id=${id}`)),
         catchError(this.handleError<Album>('deleted album'))
      );
   }

   // PUT: update the album on the server
   updateAlbum(id: string, album: Album | object): Observable<object> {
      const url = `${this.albumsUrl}/${id}`;

      return this.http.patch(url, album, this.httpOptions).pipe(
         tap(() => this.log(`updated album id=${id}`)),
         catchError(this.handleError<object>('update album'))
      );
   }

   // Handle HTTP operation that failed
   // let the app continue
   // @param operation - name of the operation that failed
   // @param result - optional value to return as the observable result

   private handleError<T>(operation = 'operation', result?: T) {
      return (error: Error): Observable<T> => {
         // TODO: send the error to remote logging infrastructure
         console.error(error); // log to console instead

         // TODO: better job of transforming error for user consumption
         this.log(`${operation} failed: ${error.message}`);

         // let the app keep running by return an empty result
         return of(result as T);
      };
   }

   // Log a AlbumService message with the MessageService
   private log(message: string) {
      this.messageService.add(`AlbumService: ${message}`);
   }
}
