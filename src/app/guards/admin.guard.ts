// Utilizes Angular's dependency injection to fetch service instances within a function
import { inject } from '@angular/core';

// Imports necessary components for route guarding and navigation in Angular
import { CanActivateFn, Router } from '@angular/router';

// Incorporates jwtDecode function to decode JSON Web Tokens
import { jwtDecode } from 'jwt-decode';

// Defines an interface for the structure of the token payload
interface TokenPayload {
  roles: string[];
}

// Implements a route guard using the CanActivateFn interface
export const adminGuard: CanActivateFn = (route, state) => {
  // Retrieves an instance of the Router service for navigation purposes
  const router = inject(Router);

  try {
    // Retrieves the access token from local storage
    const token = localStorage.getItem('ACCESS_TOKEN');

    if (token) {
      // Decodes the JWT to extract the payload
      const payload: TokenPayload = jwtDecode(token);

      // Checks if the user's roles include 'admin'
      if (payload.roles.includes('admin')) {
        // Grants access to the route for admin users
        return true;
      }
    }
  } catch (error) {
    // Handles any errors in the token decoding process
    console.error('Error decoding token', error);
  }

  // Redirects non-admin users to the login page
  router.navigate(['/auth/login']);

  // Denies route access for non-admin users
  return false;
};
