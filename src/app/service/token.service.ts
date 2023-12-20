// Injectable decorator indicates that this class can be injected as a dependency
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Importing BehaviorSubject from RxJS for reactive state management

@Injectable({
  providedIn: 'root', // Specifies that this service should be provided in the root injector (available app-wide)
})
export class TokenService {
  // BehaviorSubject to hold and emit the current token value
  private tokenSubject = new BehaviorSubject<string | null>(
    this.getAuthToken()
  );

  // Public observable of the token, derived from the BehaviorSubject
  public token$ = this.tokenSubject.asObservable();

  constructor() {
    // Empty constructor
  }

  // Method to set a new token value, both in localStorage and the BehaviorSubject
  setToken(token: string | null) {
    localStorage.setItem('ACCESS_TOKEN', token!); // Storing the token in localStorage
    this.tokenSubject.next(token); // Updating the BehaviorSubject value
  }

  // Private method to retrieve the authentication token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('ACCESS_TOKEN');
  }
}
