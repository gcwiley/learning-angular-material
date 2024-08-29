import { Injectable } from '@angular/core';

import {
   Auth,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   signInAnonymously,
   signInWithPopup,
   GoogleAuthProvider,
   signOut,
} from '@angular/fire/auth';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // injects the auth object
   constructor(private auth: Auth) {}

   // signs in the user with email and password
   async signInWithEmailAndPassword(email: string, password: string) {
      return await signInWithEmailAndPassword(this.auth, email, password);
   }

   // Creates a new user account associated with the specified email address and password.
   async createUserWithEmailAndPassword(email: string, password: string) {
      return await createUserWithEmailAndPassword(this.auth, email, password);
   }

   // Asynchronously signs in as an anonymous user.
   async signInAnonymously() {
      return await signInAnonymously(this.auth);
   }

   // Authenticates a Firebase client using a popup-based OAuth authentication flow.
   async signInWithPopup() {
      return await signInWithPopup(this.auth, new GoogleAuthProvider());
   }

   // Signs out the current user.
   async signOut() {
      return await signOut(this.auth);
   }
}
