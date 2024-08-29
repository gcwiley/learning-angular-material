import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// import the message service
import { MessageService } from './message.service';

// import the hero interface
import { Hero } from '../types/hero.interface';

@Injectable({ providedIn: 'root' })

export class HeroService {
   private heroesUrl = '/api/heroes'; // URL to web api

   httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
      }),
   };

   // inject "HttpClient" into the Hero service
   constructor(private http: HttpClient, private messageService: MessageService) {}

   // GET: all heroes from the server
   getHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.heroesUrl).pipe(
         tap(() => this.log('fetched heroes')),
         catchError(this.handleError<Hero[]>('get Heroes', []))
      );
   }

   // GET: a individual hero by ID. Will 404 error if the ID is not found
   getHero(id: string | null): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
         tap(() => this.log(`fetched hero id=${id}`)),
         catchError(this.handleError<Hero>(`get Hero id=${id}`))
      );
   }

   // GET heroes whose name contains search term - SEARCH HERO
   searchHeroes(term: string): Observable<Hero[]> {
      if (!term.trim()) {
         // if no search term, return an empty hero arrary
         return of([]);
      }
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
         tap((x) => (x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`))),
         catchError(this.handleError<Hero[]>('search heroes', []))
      );
   }

   // GET: hero the count from database
   getHeroesCount(): Observable<number> {
      return this.http.get<number>('/api/hero-count');
   }

   // GET: recent heroes added
   getRecentlyCreatedHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>('/api/recent-heroes');
   }

   // GET: featured heroes for carousel
   getFeaturedHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>('/api/favorite-heroes');
   }

   // SAVE METHODS //

   // POST: add a new hero to the server
   addHero(newHero: Hero | object): Observable<Hero> {
      return this.http.post<Hero>(this.heroesUrl, newHero, this.httpOptions).pipe(
         tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)),
         catchError(this.handleError<Hero>('add Hero'))
      );
   }

   // DELETE a hero by ID from the server
   deleteHero(id: string): Observable<Hero> {
      // create the url
      const url = `${this.heroesUrl}/${id}`;

      return this.http.delete<Hero>(url, this.httpOptions).pipe(
         tap(() => this.log(`deleted hero id=${id}`)),
         catchError(this.handleError<Hero>('delete Hero'))
      );
   }

   // PUT: update the hero in the database
   updateHero(id: string, hero: Hero | object): Observable<object> {
      // create the url
      const url = `${this.heroesUrl}/${id}`;

      return this.http.patch(url, hero, this.httpOptions).pipe(
         tap(() => this.log(`updated hero id=${id}`)),
         catchError(this.handleError<object>('update Hero'))
      );
   }

   // Handle Http operation that failed
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

   // Log a HeroService message with HeroService
   private log(message: string): void {
      return this.messageService.add(`HeroService: ${message}`);
   }
}
