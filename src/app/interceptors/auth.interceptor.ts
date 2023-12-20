// Import for Injectable decorator to define a service that can be injected into Angular components
import { Injectable } from '@angular/core';

// Imports related to Angular's HTTP client for creating an HTTP interceptor
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

// Import for Observable to handle asynchronous data streams
import { Observable } from 'rxjs';

// Import for Router to enable navigation within the Angular application
import { Router } from '@angular/router';

// Import for jwtDecode function to decode JSON Web Tokens
import { jwtDecode } from 'jwt-decode';

// Marks the class as a service that can be injected, making it available throughout the app
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // AuthInterceptor class implements the HttpInterceptor interface for intercepting HTTP requests

  // Injects the Router for use in navigating when needed
  constructor(private router: Router) {}

  // Method to intercept HTTP requests and potentially modify them before they are sent
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Retrieves the access token from local storage
    const token: any = localStorage.getItem('ACCESS_TOKEN');

    // Checks if the token exists and is valid
    if (token && this.isTokenValid(token)) {
      return next.handle(
        req.clone({
          // Clones the HttpRequest and adds an Authorization header with the Bearer token
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
    } else if (token && !this.isTokenValid(token)) {
      // If the token exists but is not valid
      // Redirects the user to the login page
      this.router.navigate(['/auth/login']);
    }

    // For requests without a valid token, handles them without modification
    return next.handle(req);
  }

  // Private method to check the validity of a JWT token
  private isTokenValid(token: string): boolean {
    try {
      // Decodes the JWT to extract its payload
      const decoded: any = jwtDecode(token);

      // Computes the current time in Unix timestamp format
      const currentUnixTime = Math.floor(Date.now() / 1000);

      // Checks if the token's expiration time is in the future
      return decoded.exp > currentUnixTime;
    } catch (error) {
      // Error handling for decoding process
      console.error('Error decoding token', error);

      // Returns false if the token is invalid or decoding fails
      return false;
    }
  }
}
