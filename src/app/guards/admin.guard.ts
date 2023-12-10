import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode} from 'jwt-decode';

interface TokenPayload {
  roles: string[];
}

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      const payload: TokenPayload = jwtDecode(token);
      if (payload.roles.includes('admin')) {
        return true;
      }
    }
  } catch (error) {
    console.error('Error decoding token', error);
  }

  router.navigate(['/auth/login']);
  return false;
};
