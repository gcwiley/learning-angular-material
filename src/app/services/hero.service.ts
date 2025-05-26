import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

// hero interface
import { Hero, HeroInput } from '../types/hero.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroesUrl = '/api/heroes'; // URL to web api

  // inject the "HttpClient" into the Hero service
  constructor(private http: HttpClient) {}

  // GET: all heroes from the server - GET HEREOS
  public getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError));
  }

  // GET: a individual hero by ID. Will 404 error if the ID is not found
  public getHeroById(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(catchError(this.handleError));
  }

  // GET: heroes whose name contains search term - SEARCH HERO
  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if no search term, return an empty hero arrary
      return of([]);
    }
    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(catchError(this.handleError));
  }

  // GET: count the heroes from database  - HERO COUNT
  public getHeroesCount(): Observable<number> {
    return this.http.get<number>('/api/heroes/count').pipe(catchError(this.handleError));
  }

  // GET: recent heroes added - RECENT HEROES
  public getRecentlyCreatedHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('/api/heroes/recent').pipe(catchError(this.handleError));
  }

  // GET: featured heroes for carousel - FEATURED HEROES
  public getFeaturedHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('/api/favorite-heroes').pipe(catchError(this.handleError));
  }

  // SAVE METHODS //

  // POST: add a new hero to the server - ADD HERO
  public addHero(newHero: HeroInput): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, newHero, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  // DELETE: a hero by ID from the server - DELETE HERO BY ID
  public deleteHeroById(id: string): Observable<Hero> {
    // create the url
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, { headers: headers }).pipe(catchError(this.handleError));
  }

  // PUT: update the hero in the database - UPDATE HERO BY ID
  public updateHeroById(id: string, body: Partial<Hero>): Observable<object> {
    const url = `${this.heroesUrl}/${id}`;
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
