import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { ProductsComponent } from './pages/products/products.component';
import { rolesGuard } from './guards/roles.guard';
import { ProductsEmployeeComponent } from './pages/products-employee/products-employee.component';
import { RegistersService } from './services/registers/registers.service';
import { inject } from '@angular/core';

function isRole(role: string) {
  const registerService = inject(RegistersService);
  return registerService.currentRegister?.role === role;
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'agregar-producto', component: AgregarProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'carrito', component:CarritoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: 'products', 
    component: ProductsComponent, 
    // canMatch: [rolesGuard]
    canMatch: [() => isRole('Admin')] 
  },
  { path: 'products', 
    component: ProductsEmployeeComponent, 
    // canMatch: [rolesGuard]
    canMatch: [() => isRole('Empleado')]
  },
  { path: 'admin-products', component: AdminProductsComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
];