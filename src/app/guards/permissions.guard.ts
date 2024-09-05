import { CanActivateFn } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  if(usersService.getCurrentUser() === null) {
    router.navigate(['/login']);
    return false
  };
  return true;
};
