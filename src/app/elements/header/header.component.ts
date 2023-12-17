import { Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
// Importing Angular core elements for component creation and handling lifecycle hooks, event handling, and DOM manipulation

import { CommonModule } from '@angular/common';
// Importing CommonModule for common directives like ngIf, ngFor

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
// Importing various Material Design modules for UI components

import { RouterLink } from '@angular/router';
// Importing RouterLink for router link directives in the template

import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';
import { set } from 'mongoose';
// Importing jwtDecode for decoding JSON Web Tokens

@Component({
  selector: 'pm-header',
  // Declaring the component selector for embedding this component in other templates

  standalone: true,
  // Enabling standalone component feature, making this component independent of any NgModule

  imports: [ CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, RouterLink],
  // Specifying the imports required for this standalone component

  templateUrl: './header.component.html',
  // Linking to an external HTML template file for this component

  styleUrls: ['./header.component.scss']
  // Linking to an external SCSS stylesheet for this component
})
export class HeaderComponent implements OnInit, OnDestroy {
  // HeaderComponent class implementing the OnChanges lifecycle hook
  private tokenSubscription!: Subscription;
  @ViewChild('detailsElement') detailsElement: ElementRef | undefined;
  // ViewChild decorator to access a DOM element, in this case, detailsElement

  @Output() isSideBar = false;
  // Output property to emit the sidebar's state, initially set to false

  @Output() newItemEvent = new EventEmitter<boolean>();
  // Output event emitter to communicate with parent components

  isLogin: boolean = false;
  // Property to track the login state

  name: string = "Login";
  // Property to hold the user's name or a default value

  isEnter: boolean = false;
  isAdmin: boolean = false;
  // Property to track mouse enter events



  constructor(private renderer: Renderer2, private tokenService: TokenService) { }
  // Constructor injecting Renderer2 for safe DOM manipulations



  ngOnInit(): void {
    this.tokenSubscription = this.tokenService.token$.subscribe(token => {
      if (token) {
        try {
          const payload: any = jwtDecode(token); 
          if (payload.email) {
            this.name = payload.email;
            this.isLogin = true;
          }
          if (payload.roles.includes('admin')) {
            // Checking if the decoded token payload includes the 'admin' role
            this.isAdmin = true;
            // Returning true allows the route activation (navigation to the route is permitted)
          } else {
            this.isAdmin = false;
            // Returning false denies the route activation (navigation to the route is denied)
          }
        } catch (error) {
          console.error('Error decoding token', error);
          this.isLogin = false;
        }
      } else {
        this.name = "Login";
        this.isLogin = false;
      }
    });
  }

  getProfile() {
    // Method to handle profile related actions
    this.isLogin = true;
    this.name = "Profile";
    // Updating the login state and name for profile scenario
  }

  toggleDetails(categories: HTMLElement, open: boolean) {
    // Method to toggle the details element
    if (open) {
      this.renderer.setAttribute(categories, 'open', 'true');
      // If 'open' is true, set the 'open' attribute on the categories element
      setTimeout(() => {
        this.renderer.removeAttribute(categories, 'open');
        // Scroll the categories element into view
      }, 3000);
    } else {
      this.renderer.removeAttribute(categories, 'open');
      // Otherwise, remove the 'open' attribute from the categories element
    }
  }
  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }
}

