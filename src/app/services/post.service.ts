import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

// post interface
import { Post, PostInput } from '../types/post.interface';

// set up headers
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = '/api/posts'; // URL to web api

  // inject 'HttpClient" into the post service
  constructor(private http: HttpClient) {}

  // GET: all posts from the server - GET POSTS
  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(catchError(this.handleError))
  }

  // GET: a individual post by ID. Will 404 error if the ID is not found
  public getPostById(id: string): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url).pipe(catchError(this.handleError));
  }

  // GET posts whose name contains search term - SEARCH POST
  public searchPosts(term: string): Observable<Post[]> {
    if (!term.trim()) {
      // if no search term, return an empty post arrary
      return of([]);
    }
    return this.http
      .get<Post[]>(`${this.postsUrl}/?name=${term}`)
      .pipe(catchError(this.handleError));
  }

  // GET: count the heroes from database  - Post COUNT
  public getPostsCount(): Observable<number> {
    return this.http.get<number>('/api/post-count').pipe(catchError(this.handleError));
  }

  // GET: recent heroes added - RECENT POSTS
  public getRecentlyCreatedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/recent-posts').pipe(catchError(this.handleError));
  }

  // SAVE METHODS

  // POST: add a new post to the server - ADD POST
  public addPost(newPost: PostInput): Observable<Post> {
    return this.http
      .post<Post>(this.postsUrl, newPost, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  // DELETE a post by ID from the server - DELETE POST
  public deletePostById(id: string): Observable<Post> {
    // create the url
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<Post>(url, { headers: headers }).pipe(catchError(this.handleError));
  }

  // PUT: update the hero in the database - UPDATE POST
  public updatePostById(id: string, body: Partial<Post>): Observable<object> {
    // create the url
    const url = `${this.postsUrl}/${id}`;
    return this.http.patch(url, body, { headers: headers }).pipe(catchError(this.handleError));
  }

  // private method that centralizes error handling - HANDLE ERROR
  private handleError(error: Error): Observable<never> {
    console.error('There was an error:', error);
    return throwError(() => error);
  }
}
