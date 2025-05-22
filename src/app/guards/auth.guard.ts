import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth, authState } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  // inject the auth and router
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    // the map operator logic is slightly simplified. instead of an 'if/else' block, it directly returns '!!user' (which evaluates to true) if user exists and false otherwide) or the UrlTree for redirection if the user is not authenticate. this achieves the same result with less code.
    map((user) => {
      // if the user is authenticated, allow navigation.
      // otherwide, redirect to the signin page using a UrlTree.
      return !!user || router.createUrlTree(['/signin']);
    })
  );
};
