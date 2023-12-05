import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

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
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  getErrorMessage(type: string) {
    if (type === 'mail' || type === 'email' ) {
      if (
        this.email.hasError('required') 
      ) {
        return 'You must enter a value';
      }
    }
    if (type === 'pass' || type === 'password') {
      if (this.password.hasError('minlength')) {
        return 'Password must be at least 6 characters';
      }else if (this.password.hasError('required')) {
        return 'You must enter a value';
      }
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  };
  login(){
    if (this.email.valid || this.password.valid) {
    console.log(this.email.value, this.password.value);
  }
}
}
