import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, of, throwError, map } from 'rxjs';

// album interfaces
import { Album, AlbumInput } from '../types/album.interface';

// define a standard wrapper for your backend response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  // comment
  private albumsUrl = '/api/albums'; 

  // inject dependencies
  private readonly http = inject(HttpClient);

  // GET: - GET ALBUMS
  public getAlbums(): Observable<Album[]> {
    return this.http.get<{ data: Album[] }>(this.albumsUrl).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error))
    );
  }

  // GET: - GET ALBUM BY ID
  public getAlbumById(id: string): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.get<{ data: Album }>(url).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error))
    );
  }

  // GET: - SEARCH ALBUMS
  public searchAlbums(term: string): Observable<Album[]> {
    if (!term.trim()) {
      // if no search term, return empty album array
      return of([]);
    }
    const params = new HttpParams().set('name', term);
    return this.http.get<{ data: Album[] }>(this.albumsUrl, { params }).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error))
    );
  }

  // GET: - GET ALBUM COUNT
  public getAlbumCount(): Observable<number> {
    return this.http.get<{ data: number }>('/api/albums/count').pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error))
    );
  }

  // GET: - GET RECENT ALBUMS
  public getRecentlyCreatedAlbums(): Observable<Album[]> {
    return this.http.get<{ data: Album[] }>('/api/albums/recent').pipe(
      map((res) => res.data), 
      catchError((error) => this.handleError(error))
    );
  }

  // SAVE METHODS

  // POST: Add a new Album to the server
  public addAlbum(newAlbum: AlbumInput): Observable<Album> {
    return this.http
      .post<Album>(this.albumsUrl, newAlbum)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // DELETE: - DELETE ALBUM BY ID
  public deleteAlbumById(id: string): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http
      .delete<Album>(url)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // PATCH: - UPDATE ALBUM BY ID
  public updateAlbumById(id: string, body: Partial<Album>): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http
      .patch<{ data: Album }>(url, body)
      .pipe(
        map((res) => res.data),
        catchError((error) => this.handleError(error))
      );
  }

  // PATCH: - FAVORITE ALBUM
  public setAlbumFavorite(id: string, favorite: boolean): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http
      .patch<{ data: Album }>(url, { favorite })
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  // HANDLE ERROR
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // client-side/network error
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // backend error
      errorMessage = `Backend returned code ${
        error.status
      }, body was ${JSON.stringify(error.error)}`;
    }
    console.error('There was an error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
