import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, of, throwError, map } from 'rxjs';

// image interfaces
import { Image, ImageInput } from '../types/image.interface';

// define a standard wrapper for your backend response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ImageService {
  // ideally, move this to environment.apiUrl
  private readonly API_URL = '/api/images';

  private http = inject(HttpClient);

  // GET: - GET IMAGES
  public getImages(): Observable<Image[]> {
    return this.http.get<ApiResponse<Image[]>>(this.API_URL).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - GET IMAGE BY ID
  public getImageById(id: string): Observable<Image> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<ApiResponse<Image>>(url).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - SEARCH IMAGES
  public searchImages(term: string): Observable<Image[]> {
    if (!term.trim()) {
      // if no search term, return an empty image array
      return of([]);
    }

    const params = new HttpParams().set('query', term);
    return this.http.get<ApiResponse<Image[]>>(this.API_URL, { params }).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - GET IMAGE COUNT
  public getImageCount(): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.API_URL}/count`).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - RECENTLY CREATED IMAGES
  public getRecentlyCreatedImages(): Observable<Image[]> {
    return this.http.get<ApiResponse<Image[]>>(`${this.API_URL}/recent`).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - FEATURED IMAGES
  public getFeaturedImages(): Observable<Image[]> {
    return this.http
      .get<ApiResponse<Image[]>>(`${this.API_URL}/favorites`)
      .pipe(
        map((res) => res.data),
        catchError((error) => this.handleError(error)),
      );
  }

  // SAVE METHODS //

  // POST: - NEW IMAGE
  public addImage(newImage: ImageInput): Observable<Image> {
    return this.http.post<ApiResponse<Image>>(this.API_URL, newImage).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // DELETE: - DELETE IMAGE BY ID
  public deleteImageById(id: string): Observable<Image> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<ApiResponse<Image>>(url).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // PATCH: - UPDATE IMAGE BY ID
  public updateImageById(
    id: string,
    body: Partial<Image>,
  ): Observable<Image> {
    const url = `${this.API_URL}/${id}`;
    return this.http.patch<ApiResponse<Image>>(url, body).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // PATCH: - FAVORITE IMAGE
  public setImageFavorite(
    id: string,
    favorite: boolean,
  ): Observable<Image> {
    const url = `${this.API_URL}/${id}`;
    return this.http.patch<ApiResponse<Image>>(url, { favorite }).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // - HANDLE ERROR
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
