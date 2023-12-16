import { Component, ElementRef, EventEmitter, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
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
import { from } from 'rxjs';
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
export class HeaderComponent implements OnChanges {
  // HeaderComponent class implementing the OnChanges lifecycle hook

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
  // Property to track mouse enter events

  constructor(private renderer: Renderer2) { }
  // Constructor injecting Renderer2 for safe DOM manipulations

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
    // Lifecycle hook that is called when any data-bound property of a directive changes
  }

  ngOnInit(): void {
    // Lifecycle hook that is called after data-bound properties are initialized
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      // Attempting to retrieve the access token from local storage

      if (token) {
        const payload: any = jwtDecode(token); 
        // Decoding the JWT token to get the payload

        if (payload.email) { 
          this.name = payload.email; 
          // Setting the user's name to the email from the payload if it exists
          this.isLogin = true; 
          // Updating the login state to true
        }
      } else {
        this.isLogin = false;
        // Setting the login state to false if no token is found
      }
    } catch (error) {
      console.error('Error decoding token', error);
      // Logging an error message in case of an exception during token decoding
      this.isLogin = false;
      // Ensuring the login state is set to false in case of an error
    }
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
    } else {
      this.renderer.removeAttribute(categories, 'open');
      // Otherwise, remove the 'open' attribute from the categories element
    }
  }
}
