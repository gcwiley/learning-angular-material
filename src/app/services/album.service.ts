import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

// album interface
import { Album, AlbumInput } from '../types/album.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private albumsUrl = '/api/albums'; // URL to web api

  // inject 'HttpClient" in the album service
  constructor(private http: HttpClient) {}

  // GET: albums from the database - GET ALL ALBUMS
  public getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl).pipe(catchError(this.handleError));
  }

  // GET: album by ID from the database - GET ALBUM BY ID
  public getAlbumById(id: string): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.get<Album>(url).pipe(catchError(this.handleError));
  }

  // GET: search albums in the database - SEARCH ALBUMS
  public searchAlbums(term: string): Observable<Album[]> {
    if (!term.trim()) {
      // if no search term, return empty hero array
      return of([]);
    }
    const params = new HttpParams().set('name', term);
    return this.http.get<Album[]>(this.albumsUrl, { params }).pipe(catchError(this.handleError));
  }

  // GET: album count from database - GET ALBUM COUNT
  public getAlbumCount(): Observable<number> {
    return this.http.get<number>('/api/albums/count').pipe(catchError(this.handleError));
  }

  // GET: recent album created in database - GET RECENT ALBUMS
  public getRecentlyCreatedAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('/api/albums/recent').pipe(catchError(this.handleError));
  }

  // SAVE METHODS

  // POST: Add a new Album to the server
  public addAlbum(newAlbum: AlbumInput): Observable<Album> {
    return this.http
      .post<Album>(this.albumsUrl, newAlbum, {
        headers: headers,
      })
      .pipe(catchError(this.handleError));
  }

  // DELETE: album by Id from the server - DELETE ALBUM BY ID
  public deleteAlbumById(id: string): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.delete<Album>(url, { headers: headers }).pipe(catchError(this.handleError));
  }

  // PUT: update the album on the database - UPDATE ALBUM BY ID
  public updateAlbumById(id: string, body: Partial<Album>): Observable<object> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.patch(url, body, { headers: headers }).pipe(catchError(this.handleError));
  }

  // enhanced error handler that centralized error handling - HANDLE ERROR
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // client-side/network error
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // backend error
      errorMessage = `Backend returned code ${error.status}, body was ${JSON.stringify(
        error.error
      )}`;
    }
    console.error('There was an error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
