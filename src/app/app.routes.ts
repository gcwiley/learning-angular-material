import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { CanDeactivateGuardService } from './guards/can-deactivate.guard';

export const routes: Routes = [
  // about page
  {
    path: 'about',
    title: 'About Page',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
  },
  // admin page
  {
    path: 'admin',
    title: 'Admin Page',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin-page/admin-page.component').then((m) => m.AdminPageComponent),
  },
  // album pages - album create page
  {
    path: 'create-album',
    title: 'Create Album',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/album-pages/album-create-page/album-create-page.component').then(
        (m) => m.AlbumCreatePageComponent
      ),
  },
  // album pages - album details page
  // fix this later!
  // homepage
  {
    path: '',
    title: 'Homepage',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/homepage/homepage.component').then((m) => m.HomepageComponent),
  },
  {
    path: 'signin',
    title: 'Sign In',
    loadComponent: () =>
      import('./pages/signin-page/signin-page.component').then((m) => m.SigninPageComponent),
  },
  {
    path: 'create-hero',
    title: 'Create Hero',
    canDeactivate: [CanDeactivateGuardService],
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/hero-pages/hero-create-page/hero-create-page.component').then(
        (m) => m.HeroCreatePageComponent
      ),
  },
];
