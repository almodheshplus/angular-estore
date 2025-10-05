import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // User Routes
  {
    path: '',
    loadComponent: () => import('../components/main/main.component').then(c => c.MainComponent),
    children: [

      { path: 'home', loadComponent: () => import('../components/home/home.component').then(c => c.HomeComponent) },
      { path: 'page/:permalink', loadComponent: () => import('../components/page/page.component').then(c => c.PageComponent) },
      { path: 'product/:id', loadComponent: () => import('../components/product/product.component').then(c => c.ProductComponent) },
      { path: 'checkout', loadComponent: () => import('../components/checkout/checkout.component').then(c => c.CheckoutComponent) },
      { path: 'cart', loadComponent: () => import('../components/cart/cart.component').then(c => c.CartComponent) },
      { path: 'login', loadComponent: () => import('../components/login/login.component').then(c => c.LoginComponent) },

      // if user goes to the main url then redirect him to home page
      { path: '', pathMatch: 'full', redirectTo: 'home' }

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutesModule { }
