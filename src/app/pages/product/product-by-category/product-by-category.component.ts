import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryControllerService } from 'src/app/openapi-client/api/categoryController.service';
import {
  CategoryDetailDto,
  CategoryShowDto,
  ProductShowDto,
} from 'src/app/openapi-client';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

// Angular component to display products by category
@Component({
  selector: 'pm-product-by-category', // Component's custom HTML tag
  standalone: true, // Indicates a standalone component
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink], // Imports necessary modules
  templateUrl: './product-by-category.component.html', // HTML template for the component
  styleUrls: ['./product-by-category.component.scss'], // Styles for the component
})
export class ProductByCategoryComponent implements OnInit {
  categories: CategoryDetailDto[] = []; // Array to store detailed category data
  filteredCategories: CategoryDetailDto[] = []; // Array for categories filtered by search

  isLoading: boolean = false; // Flag to indicate if data is loading
  isEdit: boolean = false; // Flag to indicate if the component is in edit mode
  categoryId: number | null = null; // Variable to store the current category ID
  searchText: string = ''; // String to store the search text

  // Constructor to inject services and dependencies
  constructor(
    private categoryControllerService: CategoryControllerService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef // ChangeDetectorRef to manage change detection
  ) {}

  ngOnInit() {
    // Fetches the category ID from the route parameters
    this.categoryId = this.activatedRoute.snapshot.params['id'];
    // Sets loading state and initiates category loading
    this.isLoading = true;
    setTimeout(() => {
      this.loadCategories();
    }, 800);
  }

  loadCategories() {
    // Fetches categories from the server and updates the component state
    this.isLoading = true;
    this.categoryControllerService.getCategoryById(this.categoryId!).subscribe(
      (categories) => {
        this.categories = [categories]; // Updates categories array
        this.filteredCategories = [categories]; // Updates filtered categories array
        this.isLoading = false; // Sets loading to false after loading categories
        console.log(categories);
      },
      (error) => {
        console.error('Error loading categories:', error);
        this.isLoading = false;
      }
    );
  }

  onSearch() {
    // Handles category filtering based on search text
    const searchLower = this.searchText.trim().toLowerCase();
    this.filteredCategories = this.searchText
      ? this.categories.filter((category) => {
          const matchingProducts = category.products.filter((product) =>
            product.name.toLowerCase().includes(searchLower)
          );
          return matchingProducts.length > 0;
        })
      : this.categories;
    this.cdr.detectChanges(); // Triggers change detection to update the view
  }

  filterProductsInCategory(category: { products: any[] }, searchText: string) {
    // Filters products in a given category based on search text
    if (!searchText) return category.products;
    return category.products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
