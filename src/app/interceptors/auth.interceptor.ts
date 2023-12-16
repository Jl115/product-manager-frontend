import { Injectable } from '@angular/core';
// Importing Injectable decorator to define a service that can be injected into components

import {
  HttpInterceptor, 
  HttpEvent, HttpHandler, HttpRequest 
} from '@angular/common/http';
// Importing necessary HTTP classes for creating an HTTP interceptor

import { Observable } from 'rxjs';
// Importing Observable from rxjs for handling asynchronous data streams

import { Router } from '@angular/router';
// Importing Router for navigation within the app

import { jwtDecode } from 'jwt-decode';
// Importing jwtDecode for decoding JSON Web Tokens

@Injectable()
// Injectable decorator to make this class available for dependency injection
export class AuthInterceptor implements HttpInterceptor {
  // Defining the AuthInterceptor class that implements the HttpInterceptor interface

  constructor(private router: Router) {}
  // Injecting Router into the constructor for navigation
  
  intercept(
    req: HttpRequest<unknown>, 
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
    // Implementing the intercept method required by HttpInterceptor

    const token: any = localStorage.getItem('ACCESS_TOKEN');
    // Retrieving the access token from local storage

    if (token && this.isTokenValid(token)) {
      // Checking if the token exists and is valid
      return next.handle(req.clone({
        // Cloning the HttpRequest and setting the Authorization header with the Bearer token
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }));
    }

    // If the token is not valid or not present, the request is handled without modification
    return next.handle(req);
  }

  private isTokenValid(token: string): boolean {
    // A private method to check the validity of the JWT token
    try {
      const decoded: any = jwtDecode(token);
      // Decoding the JWT token

      const currentUnixTime = Math.floor(Date.now() / 1000);
      // Getting the current time in Unix format

      return decoded.exp > currentUnixTime;
      // Checking if the token expiration time is greater than the current time
    } catch (error) {
      console.error('Error decoding token', error);
      // Logging an error if the token decoding fails

      return false;
      // Returning false if the token is invalid
    }
  }
}
