import { Injectable } from '@angular/core';

import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

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

   // sign out of application
   async signOut() {
      return await signOut(this.auth);
   }
}
