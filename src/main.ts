import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule, provideStore } from '@ngrx/store';
import { assistantReducers } from './core/store/decisions-store/assistants.reducer';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(
      IonicModule.forRoot({
        scrollAssist: true,
      })),
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ conversationsStore: assistantReducers }),
  ],
});
