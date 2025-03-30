import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, throwError } from 'rxjs';

import {
   Auth,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   signInWithPopup,
   GoogleAuthProvider,
   signOut,
   UserCredential,
} from '@angular/fire/auth';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // injects the auth object
   private readonly auth = inject(Auth);

   // Creates a new user account associated with the specified email address and password.
   public createUserWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
      return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(catchError(this.handleError))
   }

   // Asynchronously signs in using an email and password.
   public signInWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
      return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(catchError(this.handleError))
   }

   // Authenticates a Firebase client using a popup-based OAuth authentication flow.
   public signInWithGoogle(): Observable<UserCredential> {
      return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(catchError(this.handleError))
   }

   // Signs out the current user.
   public signOut(): Observable<void> {
      return from(signOut(this.auth)).pipe(catchError(this.handleError));
   }

   // private method the centralizes error handling
     private handleError(error: Error): Observable<never> {
       // NOTE: use a logging service instead of console.error
       // replace this with a more robust logging mechcanism - a dedicated logging service
       // logs error to console
       console.error('There was an error', error);
       // throws the error again, so the subscriber can catch it and handle the error
       return throwError(() => error);
     }
}
