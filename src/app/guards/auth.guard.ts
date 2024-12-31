/*
This code defines a angular authentication guard (AuthGuard) and related utilties for controlling access to routes based on user authentication status.
*/

// imports necessary modules from angular core
import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, UnaryFunction } from 'rxjs';
import { map, take } from 'rxjs/operators';

// a function type that takes an ActivatedRouteSnapshot(information about the route) and 'RouterStateSnapshot' (information about the router state) and returns an AuthPipe
export type AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthPipe;

// a function type that takes an Observable of a Firebase User or null and returns an Observable of a boolean (access granted/denied), a string (redirect URL), or an array of route segments (redirect URL)
export type AuthPipe = UnaryFunction<Observable<User | null>, Observable<boolean | string | unknown[]>>;

// this is a pre-built AuthPipe that checks if a user is logged in. It uses the map operator to transform the user observable into an observable of a boolean. It returns true if the user exists (is logged in), and false otherwise.
export const loggedIn: AuthPipe = map((user) => !!user);

// this class implements the 'CanActivate' interface, making it an Angular route guard.

// makes the AuthGuard injectable in the application.
@Injectable({
   providedIn: 'any',
})
export class AuthGuard implements CanActivate {
   // the constructor injects the 'Router' and 'Auth' services
   constructor(private router: Router, private auth: Auth) {}

   // this method is the core of the guard. it's called by the router when a user tries to navigate to a route that has this guard.
   canActivate = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      // it retrieves an authPipeFactory from the route's data '(next.data['authGuardPipe']) or defaults toa function that returns the loggedIn pipe.
      const authPipeFactory = (next.data['authGuardPipe'] as AuthPipeGenerator) || (() => loggedIn);
      // it gets the user observable using 'user(this.auth)'
      return user(this.auth).pipe(
         // takes only the first value from the user observable
         take(1),
         // executes the authPipeFactory to get the AuthPipe, passing the route and state information, and then applies the AuthPipe to the user observable.
         authPipeFactory(next, state),
         // maps the result of the auth pipe to a return values that router can use.
         map((can) => {
            // If the result is a boolean, return the boolean.
            if (typeof can === 'boolean') {
               return can;
               // If it is an array, it returns a UrlTree, meaning the route can be specified by an array.
            } else if (Array.isArray(can)) {
               return this.router.createUrlTree(can);
            } else {
               // otherwise it is assumed to be a URL and it is parsed to a UrlTree
               return this.router.parseUrl(can as string);
            }
         })
      );
   };
}

// this function is a helper to create route configuration objects with the AuthGuard.
export const canActivate = (pipe: AuthPipeGenerator) => ({
   canActivate: [AuthGuard],
   data: { authGuardPipe: pipe },
});

// this is another pre-built 'AuthPipe' that checks if a user is logged in an not anonymous. it returns true if the user exists and is not anonymous, and false otherwise.
export const isNotAnonymous: AuthPipe = map((user) => !!user && !user.isAnonymous);
