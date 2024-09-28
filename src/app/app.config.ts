import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp as initializeApp_alias } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { UserTrackingService, getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsId)
    ),
    NgxGoogleAnalyticsRouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

    // provideAnalytics(() => getAnalytics()),
    // ScreenTrackingService,
    // UserTrackingService

    // provideFirebaseApp(() => initializeApp(
    //   { "projectId": "crypto-investment-228a3", "appId": "1:363134486011:web:98f825347382241e4c375e", "storageBucket": "crypto-investment-228a3.appspot.com", "apiKey": "AIzaSyCjtJa5ltfFjk5PHWzWKUBKOO6Os7omEyc", "authDomain": "crypto-investment-228a3.firebaseapp.com", "messagingSenderId": "363134486011", "measurementId": "G-2F0LD9C3ME" }
    // )), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), 
    // ScreenTrackingService, 
    // UserTrackingService
  ]
};
