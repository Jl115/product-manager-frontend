// Importing necessary Angular core and common modules.
import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importing services and components required for this component.
import { CategoryControllerService } from 'src/app/openapi-client/api/categoryController.service';
import { RouterLink } from '@angular/router';

// Importing custom DTOs and form modules.
import {
  CategoryShowDto,
  UserControllerService,
  UserShowDto,
} from 'src/app/openapi-client';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
@Component({
  selector: 'pm-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ], // Importing necessary modules.
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  isPromote: boolean = false;

  promoteAdmin(id: number) {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, promote it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Promoted!',
          'Your imaginary User has been promoted.',
          'success'
        );
        this.categoryControllerService.promoteUser(id).subscribe(
          (response) => {
            console.log('Promotion success:', response);
          },
          (error) => {
            console.error('Promotion failed:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary user is safe :)', 'error');
      }
    });
  }

  categories: UserShowDto[] = []; // Array to store category data.
  filteredCategories: UserShowDto[] = []; // Array for storing filtered category data.
  isLoading: boolean = false; // Flag to indicate loading state.
  isEdit: boolean = false; // Flag to indicate edit state.
  searchText: string = ''; // Variable to store search text.

  // Constructor injecting the CategoryControllerService.
  constructor(private categoryControllerService: UserControllerService) {}

  // ngOnInit lifecycle hook to perform initial data loading.
  ngOnInit() {
    this.isLoading = true; // Setting the loading state.
    setTimeout(() => {
      this.loadCategories(); // Calling loadCategories after a delay.
    }, 800);
  }

  // Method to load categories from the CategoryControllerService.
  loadCategories() {
    this.isLoading = true; // Setting the loading state.
    this.categoryControllerService.getAllUsers().subscribe(
      (categories) => {
        this.categories = categories; // Assigning fetched categories.
        this.filteredCategories = categories; // Initializing filtered categories.
        this.isLoading = false; // Resetting the loading state.
      },
      (error) => {
        console.error('Error loading categories:', error); // Logging errors.
        this.isLoading = false; // Resetting the loading state.
      }
    );
  }

  // Method to handle search functionality.
  onSearch() {
    this.filteredCategories = this.searchText
      ? this.categories.filter((category) =>
          category.email!.toLowerCase().includes(this.searchText.toLowerCase())
        )
      : this.categories; // Filtering categories based on search text.
  }
}
