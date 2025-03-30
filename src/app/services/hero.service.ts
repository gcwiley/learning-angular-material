import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

// import the hero interface
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
      .get<Hero[]>(this.heroesUrl, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  // GET: a individual hero by ID. Will 404 error if the ID is not found
  public getHeroById(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url, { headers: headers }).pipe(catchError(this.handleError));
  }

  // GET heroes whose name contains search term - SEARCH HERO
  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if no search term, return an empty hero arrary
      return of([]);
    }
    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(catchError(this.handleError));
  }

  // GET: hero the count from database
  public getHeroesCount(): Observable<number> {
    return this.http.get<number>('/api/hero-count').pipe(catchError(this.handleError));
  }

  // GET: recent heroes added - RECENT HEREOS
  public getRecentlyCreatedHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('/api/recent-heroes').pipe(catchError(this.handleError));
  }

  // GET: featured heroes for carousel - FEATURED HEREOS
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

  // DELETE a hero by ID from the server - DELETE HERO
  public deleteHeroById(id: string): Observable<Hero> {
    // create the url
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, { headers: headers }).pipe(catchError(this.handleError));
  }

  // PUT: update the hero in the database - UPDATE HERO
  public updateHeroById(id: string, body: Partial<Hero>): Observable<object> {
    // create the url
    const url = `${this.heroesUrl}/${id}`;

    return this.http.patch(url, body, { headers: headers }).pipe(catchError(this.handleError));
  }

  // private method that centralizes error handling - HANDLE ERROR
  private handleError(error: Error): Observable<never> {
    // NOTE: use a logging service instead of console.error
    // replace this with a more robust logging mechcanism - a dedicated logging service
    // logs error to console
    console.error('There was an error', error);
    // throws the error again, so the subscriber can catch it and handle the error
    return throwError(() => error);
  }
}
