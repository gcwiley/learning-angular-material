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
   { path: '', component: HomepageComponent },
   // sign in page
   { path: 'signin', component: SigninPageComponent },
   // image gallery page
   { path: 'image-gallery', component: ImageGalleryPageComponent },
   // admin page
   { path: 'admin', component: AdminPageComponent },
   // HERO PAGES
   { path: 'heroes', component: HeroGridPageComponent, pathMatch: 'full' },
   { path: 'heroes/:id', component: HeroDetailsPageComponent },
   { path: 'create-hero', component: HeroCreatePageComponent },
   { path: 'edit-hero/:id', component: HeroCreatePageComponent },
   // ALBUM PAGES
   { path: 'albums', component: AlbumGridPageComponent, pathMatch: 'full' },
   { path: 'albums/:id', component: AlbumDetailsPageComponent },
   { path: 'create-album', component: AlbumCreatePageComponent },
   { path: 'edit-album/:id', component: AlbumCreatePageComponent },
   // not found page - MUST BE VERY LAST!
   { path: '**', component: NotFoundPageComponent },
];
