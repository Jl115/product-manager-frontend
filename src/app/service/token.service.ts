import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  private tokenSubject = new BehaviorSubject<string | null>(this.getAuthToken());

  public token$ = this.tokenSubject.asObservable();

  constructor() {

  }

  setToken(token: string | null) {
    localStorage.setItem('ACCESS_TOKEN', token!);
    this.tokenSubject.next(token);
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('ACCESS_TOKEN');
  }


}


