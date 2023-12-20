// Importing necessary Angular core and common modules.
import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importing services and components required for this component.
import { CategoryControllerService } from 'src/app/openapi-client/api/categoryController.service';
import { RouterLink } from '@angular/router';

// Importing custom DTOs and form modules.
import { CategoryShowDto } from 'src/app/openapi-client';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

// Decorator to define metadata for the CategoriesComponent.
@Component({
  selector: 'pm-categories', // Custom element selector to be used in templates.
  standalone: true, // Enabling standalone components feature.
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ], // Importing necessary modules.
  templateUrl: './categories.component.html', // Path to the component's template.
  styleUrls: ['./categories.component.scss'], // Path to the component's styles.
})
export class CategoriesComponent implements OnInit {
  categories: CategoryShowDto[] = []; // Array to store category data.
  filteredCategories: CategoryShowDto[] = []; // Array for storing filtered category data.
  isLoading: boolean = false; // Flag to indicate loading state.
  isEdit: boolean = false; // Flag to indicate edit state.
  searchText: string = ''; // Variable to store search text.

  // Constructor injecting the CategoryControllerService.
  constructor(private categoryControllerService: CategoryControllerService) {}

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
    this.categoryControllerService.getAllCategories().subscribe(
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
    // Filtering categories based on search text.
    this.filteredCategories = this.searchText
      ? this.categories.filter((category) =>
          category.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
      : this.categories;
  }
}
