import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductControllerService } from 'src/app/openapi-client/api/productController.service';
import { ProductShowDto } from 'src/app/openapi-client';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

// Angular component for managing and displaying products
@Component({
  selector: 'pm-product', // Component's custom HTML tag
  standalone: true, // Indicates a standalone component
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink], // Imports necessary modules
  templateUrl: './product.component.html', // HTML template for the component
  styleUrls: ['./product.component.scss'], // Styles for the component
})
export class ProductComponent implements OnInit {
  categories: ProductShowDto[] = []; // Array to store product data
  filteredProducts: ProductShowDto[] = []; // Array for products filtered by search
  isLoading: boolean = false; // Flag to indicate if data is loading
  isEdit: boolean = false; // Flag to indicate if the component is in edit mode
  searchText: string = ''; // String to store the search text

  // Constructor to inject services and dependencies
  constructor(
    private productControllerService: ProductControllerService,
    private router: Router
  ) {
    // Subscribes to router events to log navigation ends
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
      }
    });
  }

  ngOnInit() {
    // Sets loading state and initiates product loading
    this.isLoading = true;
    setTimeout(() => {
      this.loadCategories();
    }, 800);
  }

  loadCategories() {
    // Fetches product data from the server and updates the component state
    this.isLoading = true;
    this.productControllerService.getAllProducts().subscribe(
      (products) => {
        this.categories = products; // Updates product array
        this.filteredProducts = products; // Updates filtered products array
        this.isLoading = false; // Sets loading to false after loading products
        console.log(products);
      },
      (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    );
  }

  onSearch() {
    // Handles product filtering based on search text
    this.filteredProducts = this.searchText
      ? this.categories.filter((product) =>
          product.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
      : this.categories;
  }
}
