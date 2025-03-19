import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';


const firebaseConfig = {
  apiKey:  "AIzaSyBeoAF5YTgQyOfW1nZbhcc9dKswaPBS7zQ",
  authDomain: "mlx-logistics-efd04.firebaseapp.com",
  projectId: "mlx-logistics-efd04",
  //storageBucket:  "mlx-logistics-efd04.firebasestorage.app",
  storageBucket: "mlx-logistics-efd04.appspot.com",
  messagingSenderId: "452583087136",
  appId: "1:452583087136:web:5f8ae3961f3bea0c327045",
  measurementId: "G-SCHHRXYX0M"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    importProvidersFrom(BrowserModule, ReactiveFormsModule, AngularFireStorageModule, MatSnackBarModule),
  ],
};


