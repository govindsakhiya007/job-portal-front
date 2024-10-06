import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { provideToastr } from 'ngx-toastr';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.dots
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(),
    importProvidersFrom(NgWizardModule.forRoot(ngWizardConfig)),
    provideToastr()
  ]
};
