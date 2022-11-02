import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';
import { HomeGuard } from 'src/app/modules/home/guards/home.guard';
import { ProductsComponent } from './modules/products/components/products/products.component';
import { CategoriesComponent } from './modules/category/components/categories/categories.component';
import { SpecificProductComponent } from './modules/specific-product/components/specific-product/specific-product.component';
import { AllProductsComponent } from './modules/products/components/all-products/all-products.component';
import { CheckoutComponent } from './modules/checkout/components/checkout/checkout.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [{ path: '', component: AllProductsComponent }],
  },
  {
    path: 'products/:slug',
    component: SpecificProductComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    loadChildren: () =>
      import('./modules/checkout/checkout.module').then(
        (module) => module.CheckoutModule
      ),
  },
  { path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [HomeGuard] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
