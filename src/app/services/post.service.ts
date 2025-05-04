import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

// post interface
import { Post } from '../types/post.interface';

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
    return this.http.get<Post[]>(this.postsUrl);
  }

  // add error function here
}
