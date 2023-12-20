// Importing necessary Angular and Material components
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserControllerService } from 'src/app/openapi-client/api/api';
import { LoginRequestDto } from 'src/app/openapi-client/model/loginRequestDto';
import Swal from 'sweetalert2'; // Importing SweetAlert2 for alert messages
import { TokenService } from 'src/app/service/token.service';

// Component decorator defining metadata for LoginComponent
@Component({
  selector: 'pm-login', // Selector name for the component
  standalone: true, // Standalone components do not require a module
  templateUrl: './login.component.html', // Template file for the component
  styleUrls: ['./login.component.scss'], // Style file for the component
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
  ], // Modules and components imported for this component
})
export class LoginComponent {
  // FormGroup to manage the login form
  loginForm: FormGroup;

  // FormControls with validation rules for email and password
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$'),
  ]);

  // Constructor with dependency injections
  constructor(
    private userControllerService: UserControllerService, // Injecting UserControllerService
    private router: Router, // Injecting Angular Router
    private tokenService: TokenService // Injecting TokenService
  ) {
    // Initializing loginForm with FormControls
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  // Function to return error message based on validation errors
  getErrorMessage(type: string) {
    if (type === 'email') {
      if (this.email.hasError('required')) {
        return 'You must enter a value'; // Error message for required email
      }
      return this.email.hasError('email') ? 'Not a valid email' : ''; // Error for invalid email format
    }
    if (type === 'password') {
      if (this.password.hasError('minlength')) {
        return 'Password must be at least 6 characters'; // Error for password minimum length
      } else if (this.password.hasError('required')) {
        return 'You must enter a value'; // Error message for required password
      } else if (this.password.hasError('pattern')) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (@#$%^&+=)'; // Error for password pattern
      }
    }
    return '';
  }

  // Function to handle the login process
  login() {
    if (this.loginForm.valid) {
      // Making a login request if the form is valid
      this.userControllerService
        .login({ password: this.password.value!, email: this.email.value! })
        .subscribe(
          (response) => {
            // Handling successful login response
            this.tokenService.setToken(response.token!);
            Swal.fire({
              title: 'Login successful',
              text: 'You are now logged in',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                this.router.navigate(['/']).then(() => {
                  // Storing the access token
                  localStorage.setItem('ACCESS_TOKEN', response.token!);
                });
              }
            });
          },
          (error) => {
            // Handling login failure
            Swal.fire({
              title: 'Login failed',
              text: 'Please check your credentials',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
    } else {
      // Logging if the form is not valid
      console.log('Form is not valid');
    }
  }
}
