// Angular core imports for creating components, managing lifecycle hooks, DOM manipulation, and event handling
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

// Import for common Angular directives like ngIf, ngFor
import { CommonModule } from '@angular/common';

// Imports for Material Design components for a rich UI experience
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

// Import for Angular RouterLink to enable navigation within the app
import { RouterLink } from '@angular/router';

// jwtDecode for handling JWTs, Subscription for managing observables, and custom TokenService
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';

// HeaderComponent class implementing OnInit and OnDestroy lifecycle hooks
@Component({
  selector: 'pm-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Subscription to manage observable for token changes
  private tokenSubscription!: Subscription;

  // Access to a DOM element using ViewChild
  @ViewChild('detailsElement') detailsElement: ElementRef | undefined;

  // Output decorator to emit sidebar state to parent components
  @Output() isSideBar = false;

  // EventEmitter to communicate changes to parent components
  @Output() newItemEvent = new EventEmitter<boolean>();

  // Tracks login state
  isLogin: boolean = false;

  // Holds the user's name or a default value
  name: string = 'Login';

  // Tracks user's admin status and mouse enter events
  isEnter: boolean = false;
  isAdmin: boolean = false;

  // Constructor with Renderer2 for DOM manipulations and TokenService for token management
  constructor(
    private renderer: Renderer2,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    // Subscription to token changes
    this.tokenSubscription = this.tokenService.token$.subscribe((token) => {
      // Decodes the JWT token to extract the payload
      if (token) {
        try {
          const payload: any = jwtDecode(token);
          // Updates login status and name based on token payload
          this.isLogin = payload ? true : false;
          this.name = payload?.email || 'Login';
          // Determines admin status from token payload
          this.isAdmin = payload?.roles.includes('admin') || false;
        } catch (error) {
          // Error handling for token decoding
          console.error('Error decoding token', error);
          this.isLogin = false;
        }
      } else {
        this.name = 'Login';
        this.isLogin = false;
      }
    });
  }

  // Handles profile-related actions
  getProfile() {
    // Updates login state and name for profile scenario
    this.isLogin = true;
    this.name = 'Profile';
  }

  // Toggles details element based on 'open' state
  toggleDetails(categories: HTMLElement, open: boolean) {
    if (open) {
      // Opens the details element if 'open' is true
      this.renderer.setAttribute(categories, 'open', 'true');
      setTimeout(() => {
        // Closes the details element after a delay
        this.renderer.removeAttribute(categories, 'open');
      }, 3000);
    } else {
      // Closes the details element immediately if 'open' is false
      this.renderer.removeAttribute(categories, 'open');
    }
  }

  ngOnDestroy(): void {
    // Unsubscribes from the token observable on component destruction
    this.tokenSubscription.unsubscribe();
  }
}
