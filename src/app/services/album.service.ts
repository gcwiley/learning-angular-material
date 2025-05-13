import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // GET: albums from the database - GET ALBUMS
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
    return this.http
      .get<Album[]>(`${this.albumsUrl}/?name=${term}`)
      .pipe(catchError(this.handleError));
  }

  // GET: album count from database - GET ALBUM COUNT
  public getAlbumCount(): Observable<number> {
    return this.http.get<number>('/api/album-count').pipe(catchError(this.handleError));
  }

  // GET: recent album created in database - GET RECENT ALBUMS
  public getRecentlyCreatedAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('/api/recent-albums').pipe(catchError(this.handleError));
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

  // DELETE: album by Id from the server - DELETE ALBUM
  public deleteAlbumById(id: string): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.delete<Album>(url, { headers: headers }).pipe(catchError(this.handleError));
  }

  // PUT: update the album on the database - UPDATE ALBUM
  public updateAlbumById(id: string, body: Partial<Album>): Observable<object> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.patch(url, body, { headers: headers }).pipe(catchError(this.handleError));
  }

  // private method the centralizes error handling
  private handleError(error: Error): Observable<never> {
    // NOTE: use a logging service instead of console.error
    // replace this with a more robust logging mechcanism - a dedicated logging service
    // logs error to console
    console.error('There was an error', error);
    // throws the error again, so the subscriber can catch it and handle the error
    return throwError(() => error);
  }
}
