import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, of, throwError, map } from 'rxjs';

// hero interfaces
import { Hero, HeroInput } from '../types/hero.interface';

// define a standard wrapper for your backend response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({providedIn: 'root',})
export class HeroService {
  // ideally, move this to environment.apiUrl
  private readonly API_URL = '/api/heroes';

  private http = inject(HttpClient);

  // GET: - GET HEROES
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<ApiResponse<Hero[]>>(this.API_URL).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - GET HERO BY ID
  public getHeroById(id: string): Observable<Hero> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<ApiResponse<Hero>>(url).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - SEARCH HEROES
  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if no search term, return an empty hero array
      return of([]);
    }
    const params = new HttpParams().set('name', term);
    return this.http.get<{ data: Hero[] }>(this.API_URL, { params }).pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - COUNT HEROES
  public getHeroesCount(): Observable<number> {
    return this.http.get<{ data: number }>('/api/heroes/count').pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - RECENT HEROES
  public getRecentlyCreatedHeroes(): Observable<Hero[]> {
    return this.http.get<{ data: Hero[] }>('/api/heroes/recent').pipe(
      map((res) => res.data),
      catchError((error) => this.handleError(error)),
    );
  }

  // GET: - FEATURED HEROES
  public getFeaturedHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>('/api/favorite-heroes')
      .pipe(catchError((error) => this.handleError(error)));
  }

  // SAVE METHODS //

  // POST: - ADD HERO
  public addHero(newHero: HeroInput): Observable<Hero> {
    return this.http
      .post<Hero>(this.API_URL, newHero)
      .pipe(catchError(this.handleError));
  }

  // DELETE: - DELETE HERO BY ID
  public deleteHeroById(id: string): Observable<Hero> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<Hero>(url).pipe(catchError(this.handleError));
  }

  // PATCH: - UPDATE HERO BY ID
  public updateHeroById(id: string, body: Partial<Hero>): Observable<Hero> {
    const url = `${this.API_URL}/${id}`;
    return this.http.patch<Hero>(url, body).pipe(catchError(this.handleError));
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
