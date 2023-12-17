import { inject } from '@angular/core';
// Importing the inject function to get an instance of a service within a function

import { CanActivateFn, Router } from '@angular/router';
// Importing CanActivateFn and Router from Angular's router module for guard implementation and navigation

import { jwtDecode } from 'jwt-decode';
// Importing jwtDecode for decoding JSON Web Tokens

interface TokenPayload {
  roles: string[];  
}

export const adminGuard: CanActivateFn = (route, state) => {
  // Declaring a guard function that implements the CanActivateFn interface

  const router = inject(Router);
  // Using Angular's inject function to get an instance of the Router service

  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    // Attempting to retrieve the access token from local storage

    if (token) {
      const payload: TokenPayload = jwtDecode(token);
      // Decoding the JWT token to get the payload

      if (payload.roles.includes('admin')) {
        // Checking if the decoded token payload includes the 'admin' role
        return true;
        // Returning true allows the route activation (navigation to the route is permitted)
      }
    }
  } catch (error) {
    console.error('Error decoding token', error);
    // Logging an error message in case of an exception during token decoding
  }

  router.navigate(['/auth/login']);
  // Navigating to the login route if the token is not present or valid

  return false;
  // Returning false prevents the route activation (navigation to the route is not permitted)
};
