import { Routes } from '@angular/router';

// import the page components
import {
   AboutPageComponent,
   AdminPageComponent,
   AlbumCreatePageComponent,
   AlbumDetailsPageComponent,
   AlbumGridPageComponent,
   ErrorPageComponent,
   HeroCreatePageComponent,
   HeroDetailsPageComponent,
   HeroGridPageComponent,
   HomepageComponent,
   ImageGalleryPageComponent,
   NotFoundPageComponent,
   SigninPageComponent,
} from './pages';

export const routes: Routes = [
   // home page
   // CURRENTY REDIRECT TO ERROR PAGE - FIX THIS!
   { path: '', component: HomepageComponent, pathMatch: 'full' },
   // sign in page
   { path: 'signin', component: SigninPageComponent, title: 'Sign In' },
   // image gallery page
   { path: 'image-gallery', component: ImageGalleryPageComponent, title: 'Image Gallery' },
   // admin page
   { path: 'admin', component: AdminPageComponent, title: 'Admin Dashboard' },
   { path: 'about', component: AboutPageComponent, title: 'About Page' },
   // HERO PAGES
   { path: 'heroes', component: HeroGridPageComponent, pathMatch: 'full' },
   { path: 'heroes/:id', component: HeroDetailsPageComponent, pathMatch: 'full' },
   { path: 'create-hero', component: HeroCreatePageComponent, pathMatch: 'full' },
   { path: 'edit-hero/:id', component: HeroCreatePageComponent, pathMatch: 'full' },
   // ALBUM PAGES
   { path: 'albums', component: AlbumGridPageComponent, pathMatch: 'full' },
   { path: 'albums/:id', component: AlbumDetailsPageComponent, pathMatch: 'full' },
   { path: 'create-album', component: AlbumCreatePageComponent, pathMatch: 'full' },
   { path: 'edit-album/:id', component: AlbumCreatePageComponent, pathMatch: 'full' },
   // error page
   { path: 'error', component: ErrorPageComponent },
   // not found page - MUST BE VERY LAST!
   { path: '**', component: NotFoundPageComponent },
];
