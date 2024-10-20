import { Routes } from '@angular/router';

// import the page components
import {
   AdminPageComponent,
   AlbumCreatePageComponent,
   AlbumDetailsPageComponent,
   AlbumGridPageComponent,
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
   { path: '', component: HomepageComponent, title: 'Home Page' },
   // sign in page
   { path: 'signin', component: SigninPageComponent },
   // image gallery page
   { path: 'image-gallery', component: ImageGalleryPageComponent },
   // admin page
   { path: 'admin', component: AdminPageComponent },
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
   // not found page - MUST BE VERY LAST!
   { path: '**', component: NotFoundPageComponent },
];
