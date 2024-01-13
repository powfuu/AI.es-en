import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./domain/components/tabs/tabs.routes').then((m) => m.routes),
  },
];
