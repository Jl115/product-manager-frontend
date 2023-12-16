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
import Swal from 'sweetalert2';

@Component({
  selector: 'pm-login',
  standalone: true,

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$'),
  ]);
  constructor(
    private userControllerService: UserControllerService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  getErrorMessage(type: string) {
    if (type === 'mail' || type === 'email') {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }
    }
    if (type === 'pass' || type === 'password') {
      if (this.password.hasError('minlength')) {
        return 'Password must be at least 6 characters';
      } else if (this.password.hasError('required')) {
        return 'You must enter a value';
      } else if (this.password.hasError('pattern')) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (@#$%^&+=)';
      }
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  login() {
    if (this.email.valid && this.password.valid) {
      this.userControllerService
        .login({ password: this.password.value!, email: this.email.value! })
        .subscribe(
          (response) => {
            Swal.fire({
              title: 'Login successful',
              text: 'You are now logged in',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem('ACCESS_TOKEN', response.token!);
                this.router.navigate(['/']).then(() => {
                  window.location.reload();
                });
              }
            });
          },
          (error) => {
            Swal.fire({
              title: 'Login failed',
              text: 'Please check your credentials',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
    } else {
      console.log('Form is not valid');
    }
  }
}
