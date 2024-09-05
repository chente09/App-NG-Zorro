import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ProductosComponent } from './pages/productos/productos.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'carrito', component:CarritoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: 'products', component: ProductosComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) }
];
