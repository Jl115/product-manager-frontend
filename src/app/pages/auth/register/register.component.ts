import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserControllerService } from 'src/app/openapi-client/api/api';

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
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      console.log('Registration data:', this.registerForm.value);
  
      // Verwenden Sie this.registerForm.value direkt
      this.userControllerService.register(this.registerForm.value).subscribe(
        user => {
          console.log('Server response:', user);
          // Implementieren Sie hier die Logik bei erfolgreicher Registrierung
          console.log(this.userControllerService.getAllUsers());
          this.isError = false;
        },
        error => {
          console.error('Error during registration:', error);
          // Implementieren Sie hier die Fehlerbehandlung
          this.isError = true;
          
        }
      );
  
    } else {
      console.log('Form is not valid');
      // Implementieren Sie hier die Logik zur Behandlung ungültiger Formulardaten
    }
  }
  

}
