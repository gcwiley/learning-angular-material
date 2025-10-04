import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // about page
  {
    path: 'about',
    title: 'About Page',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/about-page/about-page').then((m) => m.AboutPage),
  },
  // admin page
  {
    path: 'admin',
    title: 'Admin Page',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin-page/admin-page').then((m) => m.AdminPage),
  },
  // homepage
  {
    path: '',
    title: 'Homepage',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/homepage/homepage').then((m) => m.Homepage),
  },
  // sign in page
  {
    path: 'signin',
    title: 'Sign In',
    loadComponent: () =>
      import('./pages/signin-page/signin-page').then((m) => m.SigninPage),
  },
  // sign up page
  {
    path: 'signup',
    title: 'Sign Up',
    loadComponent: () =>
      import('./pages/signup-page/signup-page').then((m) => m.SignupPage),
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
          import('./pages/album-pages/album-grid-page/album-grid-page').then(
            (m) => m.AlbumGridPage
          ),
      },
      {
        path: 'create',
        title: 'Create Album',
        loadComponent: () =>
          import('./pages/album-pages/album-create-page/album-create-page').then(
            (m) => m.AlbumCreatePage
          ),
      },
      {
        path: ':id',
        title: 'Album Details',
        loadComponent: () =>
          import('./pages/album-pages/album-details-page/album-details-page').then(
            (m) => m.AlbumDetailsPage
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
          import('./pages/hero-pages/hero-grid-page/hero-grid-page').then(
            (m) => m.HeroGridPage
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
          import('./pages/post-pages/post-grid-page/post-grid-page').then(
            (m) => m.PostGridPage
          ),
      },
      {
        path: 'create',
        title: 'Create Post',
        loadComponent: () =>
          import('./pages/post-pages/post-create-page/post-create-page').then(
            (m) => m.PostCreatePage
          ),
      },
      {
        path: ':id',
        title: 'Post Details',
        loadComponent: () =>
          import('./pages/post-pages/post-details-page/post-details-page').then(
            (m) => m.PostDetailsPage
          ),
      },
    ],
  },
];
