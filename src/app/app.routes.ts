import {
   redirectLoggedInTo,
   redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuardService } from './guards/can-deactivate.guard';

// this is a helper function that returns a function that redirects unauthenticated users to the signin page
const redirectUnauthorizedToSignin = () => redirectUnauthorizedTo('/signin');
// this is a helper function that redirects authenticated  users to the albums section
const redirectAuthorizedToAlbums = () => redirectLoggedInTo('/albumns');

export const routes: Routes = [
   // homepage
   {
      path: '',
      title: 'Homepage',
      pathMatch: 'full',
      // lazy load the component when the route is activated
      loadComponent: () =>
         import('./pages/homepage/homepage.component').then(
            (m) => m.HomepageComponent
         ),
   },
   {
      path: 'create-hero',
      title: 'Create Hero',
      // before the user navigates away from this route, the guard will be executed to check if it is allowed
      // this prevents accidential navigation away from an unsaved form.
      canDeactivate: [CanDeactivateGuardService],
      // lazy load the component when the route is activated
      loadComponent: () =>
         import(
            './pages/hero-pages/hero-create-page/hero-create-page.component'
         ).then((m) => m.HeroCreatePageComponent),
   },
];
