import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./user/routes/routes.module').then(m => m.UserRoutesModule) },
  { path: 'admin', loadChildren: () => import('./admin/routes/routes.module').then(m => m.AdminRoutesModule) },
  { path: 'not-local', loadComponent: () => import('./not-local/not-local.component').then(c => c.NotLocalComponent) },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
