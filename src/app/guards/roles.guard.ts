import { Component, inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { RegistersService } from '../services/registers/registers.service';
import { log } from 'ng-zorro-antd/core/logger';

export const rolesGuard: CanMatchFn = (route, segments) => {
  const router = inject (Router);
  const registerService = inject (RegistersService);
  const component = route.component?.name;
  const role = registerService.currentRegister?.role;
  console.log(role);
  if (role === 'Admin') return true;
  if(role === 'Empleado' && component === '_ProductsEmployeeComponent') return true;
  if(!role) return router.navigate(['/login']);
  return false;
};
