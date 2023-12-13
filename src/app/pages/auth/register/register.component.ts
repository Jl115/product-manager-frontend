import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserControllerService } from 'src/app/openapi-client/api/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'pm-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isError = false;

  constructor(
    private formBuilder: FormBuilder,
    private userControllerService: UserControllerService
    ) {
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

  register() {
    if (this.registerForm.valid) {
      console.log('Registration data:', this.registerForm.value);
  
      this.userControllerService.register(this.registerForm.value).subscribe(
        user => {
          Swal.fire({
            title: 'Registration successful',
            text: 'You can now log in',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          setTimeout(() => {

            console.log('Server response:', user);
            this.isError = false;
          }
          , 2000);

          
          

        },
        error => {
          console.error('Error during registration:', error);

          this.isError = true;
          
        }
      );
  
    } else {
      console.log('Form is not valid');
      // Implementieren Sie hier die Logik zur Behandlung ungültiger Formulardaten
    }
  }
  

}
