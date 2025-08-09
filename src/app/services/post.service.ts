import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, throwError, map } from 'rxjs';

// post interfaces
import { Post, PostInput } from '../types/post.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = '/api/posts'; // URL to web api

  // inject 'HttpClient" into the post service
  private http = inject(HttpClient);

  // GET: all posts from the server - GET POSTS
  public getPosts(): Observable<Post[]> {
    return this.http.get<{ data: Post[] }>(this.postsUrl).pipe(
      map((res) => res.data), // extract the array
      catchError(this.handleError)
    );
  }

  // GET: a individual post by ID. Returns 404 is the ID is not found.
  public getPostById(id: string): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<{ data: Post }>(url).pipe(
      map((res) => res.data), // extract the array
      catchError(this.handleError)
    );
  }

  // GET posts whose name contains search term - SEARCH POST
  public searchPosts(term: string): Observable<Post[]> {
    if (!term.trim()) {
      // if no search term, return an empty post arrary
      return of([]);
    }
    const params = new HttpParams().set('query', term);
    return this.http
      .get<{ data: Post[] }>(`${this.postsUrl}/search`, { params })
      .pipe(
        map((res) => res.data), catchError(this.handleError)
      );
  }

  // GET: count the posts from database  - GET POST COUNT
  public getPostsCount(): Observable<number> {
    return this.http.get<{ data: number }>('/api/posts/count').pipe(
      map((res) => res.data), // extract the array
      catchError(this.handleError)
    );
  }

  // GET: recent posts added - GET RECENT POSTS
  public getRecentlyCreatedPosts(): Observable<Post[]> {
    return this.http.get<{ data: Post[] }>('/api/posts/recent').pipe(
      map((res) => res.data), // extract the array
      catchError(this.handleError)
    );
  }

  // SAVE METHODS

  // POST: add a new post to the server - ADD POST
  public addPost(newPost: PostInput): Observable<Post> {
    return this.http
      .post<{ data: Post }>(this.postsUrl, newPost, { headers: headers })
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  // DELETE: a post by ID from the server - DELETE POST BY ID
  public deletePostById(id: string): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<{ data: Post }>(url, { headers: headers }).pipe(
      map((res) => res.data),
      catchError(this.handleError));
  }

  // PUT: update the post in the database - UPDATE POST BY ID
  public updatePostById(id: string, body: Partial<Post>): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http
      .patch<{ data: Post }>(url, body, { headers: headers })
      .pipe(map((res) => res.data), catchError(this.handleError));
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
