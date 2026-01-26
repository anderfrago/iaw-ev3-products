import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list';
import { ProductFormComponent } from './products/product-form/product-form';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [authGuard] },
];
