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
  {
    path: 'albums/:id',
    title: 'Album Details',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/album-pages/album-details-page/album-details-page.component').then(
        (m) => m.AlbumDetailsPageComponent
      ),
  },
  // album pages - album grid page
  {
    path: 'albums',
    title: 'Albums Page',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/album-pages/album-grid-page/album-grid-page.component').then(
        (m) => m.AlbumGridPageComponent
      ),
  },
  // homepage
  {
    path: '',
    title: 'Homepage',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/homepage/homepage.component').then((m) => m.HomepageComponent),
  },
  // post pages - post create page
  {
    path: 'create-post',
    title: 'Create Post',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/post-pages/post-create-page/post-create-page.component').then(
      (m) => m.PostCreatePageComponent
    )
  },
  // post pages - post details page
  {
    path: 'posts/:id',
    title: 'Post Details',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/post-pages/post-details-page/post-details-page.component').then(
      (m) => m.PostDetailsPageComponent
    )
  },
  // sign in page
  {
    path: 'signin',
    title: 'Sign In',
    loadComponent: () =>
      import('./pages/signin-page/signin-page.component').then((m) => m.SigninPageComponent),
  },
  // sign up page
  {
    path: 'signup',
    title: 'Sign Up',
    loadComponent: () => import('./pages/signup-page/signup-page.component').then((m) => m.SignupPageComponent),
  },
  // create hero page
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
