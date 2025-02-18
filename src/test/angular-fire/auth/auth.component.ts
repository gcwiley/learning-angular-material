import { Component, OnDestroy, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angulur fire auth
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrl: './auth.component.scss',
   standalone: true,
   imports: [CommonModule],
})
export class AuthComponent implements OnDestroy {
   private readonly userDisposable: Subscription | undefined;
   public readonly user: Observable<User | null> = EMPTY;

   showLoginButton = false;
   showLogoutButton = false;

   constructor(@Optional() private auth: Auth) {
      if (auth) {
         this.user = authState(this.auth)
            .pipe(
               traceUntilFirst('auth'),
               map((u) => !!u)
            )
            .subscribe((isLoggedIn: boolean) => {
               this.showLoginButton = !isLoggedIn;
               this.showLogoutButton = isLoggedIn;
            });
      }
   }

   ngOnDestroy(): void {
      if (this.userDisposable) {
         this.userDisposable.unsubscribe();
      }
   }

   async login() {
      return await signInWithPopup(this.auth, new GoogleAuthProvider());
   }

   async loginAnonymously() {
      return await signInAnonymously(this.auth);
   }

   async logout() {
      return await signOut(this.auth);
   }
}
