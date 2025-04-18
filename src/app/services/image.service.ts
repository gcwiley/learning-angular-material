import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public uploadImage(formData: FormData): Observable<void> {
    return this.http.post<void>('/api/upload', formData);
  }
}
