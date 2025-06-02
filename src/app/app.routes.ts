import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

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
  // homepage
  {
    path: '',
    title: 'Homepage',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/homepage/homepage.component').then((m) => m.HomepageComponent),
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
    loadComponent: () =>
      import('./pages/signup-page/signup-page.component').then((m) => m.SignupPageComponent),
  },

  // GROUPED ALBUM ROUTES
  {
    path: 'albums',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Albums Page',
        loadComponent: () =>
          import('./pages/album-pages/album-grid-page/album-grid-page.component').then(
            (m) => m.AlbumGridPageComponent
          ),
      },
      {
        path: 'create',
        title: 'Create Album',
        loadComponent: () =>
          import('./pages/album-pages/album-create-page/album-create-page.component').then(
            (m) => m.AlbumCreatePageComponent
          ),
      },
      {
        path: ':id',
        title: 'Album Details',
        loadComponent: () =>
          import('./pages/album-pages/album-details-page/album-details-page.component').then(
            (m) => m.AlbumDetailsPageComponent
          ),
      },
    ],
  },
  // GROUPED HERO PAGES - FIX THIS!
  {
    path: 'heroes',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Heroes Page',
        loadComponent: () =>
          import('./pages/hero-pages/hero-grid-page/hero-grid-page.component').then(
            (m) => m.HeroGridPageComponent
          ),
      },
    ],
  },
  // GROUP POST PAGES
  {
    path: 'posts',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Post Page',
        loadComponent: () =>
          import('./pages/post-pages/post-grid-page/post-grid-page.component').then(
            (m) => m.PostGridPageComponent
          ),
      },
      {
        path: 'create',
        title: 'Create Post',
        loadComponent: () =>
          import('./pages/post-pages/post-create-page/post-create-page.component').then(
            (m) => m.PostCreatePageComponent
          ),
      },
      {
        path: ':id',
        title: 'Post Details',
        loadComponent: () =>
          import('./pages/post-pages/post-details-page/post-details-page.component').then(
            (m) => m.PostDetailsPageComponent
          ),
      },
    ],
  },
];
