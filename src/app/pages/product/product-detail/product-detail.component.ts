// Importing Angular core components and modules for component interaction and routing
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  ProductControllerService,
  ProductDetailDto,
} from 'src/app/openapi-client';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

// Decorator to define metadata for the ProductDetailComponent
@Component({
  selector: 'pm-product-detail', // Custom HTML tag for this component
  standalone: true, // Indicates standalone component
  imports: [CommonModule, RouterLink], // Required modules for this component
  templateUrl: './product-detail.component.html', // HTML template file
  styleUrls: ['./product-detail.component.scss'], // CSS styles for this component
})
export class ProductDetailComponent implements OnInit {
  // Variables to store product details and the product ID
  product: ProductDetailDto | null = null;
  productId: number | null = null;

  // Constructor initializing services
  constructor(
    private productControllerService: ProductControllerService, // Service for product operations
    private activatedRoute: ActivatedRoute, // Service to access route parameters
    private location: Location // Angular Location service for navigation
  ) {}

  // OnInit lifecycle hook to load product details
  ngOnInit(): void {
    // Fetching product ID from route parameters
    this.productId = this.activatedRoute.snapshot.params['id'];
    // Calling function to load product data
    this.loadProduct();
  }

  // Function to load product details from the server
  loadProduct() {
    // Making API call to fetch product by ID
    this.productControllerService.getProductById(this.productId!).subscribe(
      (product) => {
        this.product = product; // Assigning fetched product to the variable
        console.log(product); // Logging product data
      },
      (error) => {
        console.error('Error loading product:', error); // Logging error in case of failure
      }
    );
  }

  // Function to navigate back to the previous page
  navigateBack() {
    this.location.back(); // Using Location service to navigate back
  }
}
