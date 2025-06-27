import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError, map } from 'rxjs';

// image interfacees
import { Image, ImageInput } from '../types/image.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imagesUrl = '/api/images'; // URL to web api

  // inject 'HttpClient" into the image service
  private http = inject(HttpClient);

  // GET: all images from the server - GET IMAGES
  public getImages(): Observable<Image[]> {
    return this.http.get<{ data: Image[] }>(this.imagesUrl).pipe(
      map((res) => res.data), // extract the array
      catchError(this.handleError)
    );
  }

  // GET: an individual image by ID
  public getImageById(id: string): Observable<Image> {
    const url = `${this.imagesUrl}/${id}`;
    return this.http.get<{ data: Image }>(url).pipe(
      map((res) => res.data), // extract the array
      catchError(this.handleError)
    );
  }

  // POST: upload image to server
  public uploadImage(formData: FormData): Observable<void> {
    return this.http.post<void>('/api/upload', formData).pipe(catchError(this.handleError));
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
