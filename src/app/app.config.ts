// Set of config options available during the application bootstrap operation.
import { ApplicationConfig } from '@angular/core';

// import the router helper function
import { provideRouter } from '@angular/router';

// Configures Angular's HttpClient service to be available for injection.
import { provideHttpClient, withFetch } from '@angular/common/http';

// import the animation function
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// import the firebase libraries
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

// import the env variables
import { environment } from '../environments/environment';

// import the routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
   providers: [
      // sets up providers necessary to enable Router functionality for the application
      provideRouter(routes),
      // Configures Angular's HttpClient service to be available for injection.
      provideHttpClient(withFetch()),
      //  enable animations in an application
      provideAnimationsAsync(),
      // creates and initializes an firebase app instance
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      // creates and initializes a firestore instance
      provideFirestore(() => getFirestore()),
      // creates and initializes an auth instance
      provideAuth(() => getAuth()),
      // Returns the instance of the Realtime Database SDK that is associated with the provided FirebaseApp
      provideDatabase(() => getDatabase()),
      // Gets a FirebaseStorage instance for the given Firebase app.
      provideStorage(() => getStorage()),
      provideAnimationsAsync(),
   ],
};
