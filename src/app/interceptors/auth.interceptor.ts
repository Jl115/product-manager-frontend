import { Injectable } from '@angular/core';
import {
  HttpInterceptor, 
  HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  
  intercept(
    req: HttpRequest<unknown>, 
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
    const token: any =  localStorage.getItem('ACCESS_TOKEN')
      if ( token && this.isTokenValid(token) ) {
        return  next.handle(req.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
          }
        }));
      }
        this.router.navigate(['/auth/login']);
        return next.handle(req);
      } 
      private isTokenValid(token: string): boolean {
        try {
          const decoded: any = jwtDecode(token);
          const currentUnixTime = Math.floor(Date.now() / 1000);
          return decoded.exp > currentUnixTime;
        } catch (error) {
          console.error('Error decoding token', error);
          return false;
        }
      }
    }
       
  

