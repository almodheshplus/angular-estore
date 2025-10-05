import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../services/admin.guard';
import { ProductsComponent } from '../components/products/products.component';
import { ManageProductComponent } from '../components/manage-product/manage-product.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/main/main.component').then(c => c.MainComponent),
    children: [
      { path: 'home', loadComponent: () => import('../components/home/home.component').then(c => c.HomeComponent) },
      { path: 'products', component: ProductsComponent },
      { path: 'manage-product/:id', component: ManageProductComponent },
      { path: 'pages', loadComponent: () => import('../components/pages/pages.component').then(c => c.PagesComponent) },
      { path: 'settings', loadComponent: () => import('../components/settings/settings.component').then(c => c.SettingsComponent) },
      { path: 'info', loadComponent: () => import('../components/info/info.component').then(c => c.InfoComponent) },

      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ],
    canActivate: [adminGuard]
    // Note: you must do canActivateChild for security reasons
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [adminGuard]
})
export class AdminRoutesModule { }
