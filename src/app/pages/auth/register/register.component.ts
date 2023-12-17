import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserControllerService } from 'src/app/openapi-client/api/api';
import Swal from 'sweetalert2';

// This Angular component is for user registration.
@Component({
  selector: 'pm-register',  // Defines the custom HTML tag for this component.
  standalone: true,        // Standalone components don't require NgModule.
  imports: [               // Specifies Angular modules used in this component.
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',  // Links to the HTML template.
  styleUrls: ['./register.component.scss']   // Links to the styling for this component.
})
export class RegisterComponent {
  registerForm: FormGroup;  // FormGroup to handle registration form data.
  isError = false;          // Flag to track if there's an error during registration.

  // Constructor to initialize the component with necessary services.
  constructor(
    private formBuilder: FormBuilder,             // FormBuilder to simplify form creation.
    private userControllerService: UserControllerService // Service to handle user registration.
  ) {
    // Initializing registerForm with form controls and validation rules.
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.pattern('[0-9]+')],
      mobilePhone: ['', Validators.pattern('[0-9]+')],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')
      ]]
    });
  }

  // Function to handle form submission.
  register() {
    if (this.registerForm.valid) {
      console.log('Registration data:', this.registerForm.value);

      // Calls the register method from the userControllerService with form data.
      this.userControllerService.register(this.registerForm.value).subscribe(
        user => {
          // Success callback: Shows a success message using SweetAlert2.
          Swal.fire({
            title: 'Registration successful',
            text: 'You can now log in',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Delayed console log to simulate response handling.
          setTimeout(() => {
            console.log('Server response:', user);
            this.isError = false;
          }, 2000);
        },
        error => {
          // Error callback: Logs and flags the error.
          console.error('Error during registration:', error);
          this.isError = true;
        }
      );
    } else {
      console.log('Form is not valid');
      // Logic for handling invalid form data can be implemented here.
    }
  }
}
