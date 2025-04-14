import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { CanDeactivateGuardService } from './guards/can-deactivate.guard';

export const routes: Routes = [
   // homepage
   {
      path: '',
      title: 'Homepage',
      pathMatch: 'full',
      canActivate: [authGuard],
      // lazy load the component when the route is activated
      loadComponent: () =>
         import('./pages/homepage/homepage.component').then(
            (m) => m.HomepageComponent
         ),
   },
   {
      path: 'create-hero',
      title: 'Create Hero',
      canDeactivate: [CanDeactivateGuardService],
      canActivate: [authGuard],
      loadComponent: () =>
         import(
            './pages/hero-pages/hero-create-page/hero-create-page.component'
         ).then((m) => m.HeroCreatePageComponent),
   },
];
