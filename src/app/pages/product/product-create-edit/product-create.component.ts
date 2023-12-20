// Importing Angular core components and modules for form handling and routing
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Importing services and DTOs (Data Transfer Objects) from OpenAPI client
import {
  CategoryControllerService,
  CategoryShowDto,
  ProductControllerService,
  ProductUpdateDto,
} from 'src/app/openapi-client';
import Swal from 'sweetalert2'; // Importing SweetAlert2 for alert dialogs

// Decorator to define metadata for the ProductCreateComponent
@Component({
  selector: 'pm-product-create', // Custom HTML tag for this component
  templateUrl: './product-create.component.html', // HTML template file
  standalone: true, // Indicates standalone component
  imports: [ReactiveFormsModule, CommonModule], // Required modules for this component
  styleUrls: ['./product-create.component.scss'], // CSS styles for this component
})
export class ProductCreateComponent implements OnInit {
  // FormGroup to manage product form data
  productForm: FormGroup;
  // Flags to determine the mode (create or edit) and store the product ID
  isEdit: boolean = false;
  productId: number | null = null;
  // Array to store categories fetched from the service
  categories: CategoryShowDto[] = [];

  // Constructor initializing services and form group
  constructor(
    private productControllerService: ProductControllerService, // Service for product operations
    private router: Router, // Angular Router for navigation
    private activatedRoute: ActivatedRoute, // Service to access route parameters
    private categoryControllerService: CategoryControllerService // Service for category operations
  ) {
    // Initializing the product form with validators
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sku: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoryId: new FormControl('', [Validators.required]),
      isActive: new FormControl(true),
    });
  }

  // OnInit lifecycle hook to load categories and fetch product details if in edit mode
  ngOnInit() {
    // Fetching all categories to populate the dropdown in the form
    this.categoryControllerService.getAllCategories().subscribe(
      (categories) => (this.categories = categories),
      (error) => console.error('Error loading categories:', error)
    );

    // Checking for product ID in route params to determine edit mode
    const productId = this.activatedRoute.snapshot.params['id'];
    if (productId) {
      this.isEdit = true;
      this.productId = productId;
      // Fetching product details to populate the form in edit mode
      this.productControllerService.getProductById(productId).subscribe(
        (product) => {
          this.productForm.patchValue({
            name: product.name,
            sku: product.sku,
            description: product.description,
            image: product.image,
            price: product.price,
            stock: product.stock,
            categoryId: product.category,
            isActive: product.active,
          });
        },
        (error) => console.error('Error fetching product:', error)
      );
    }
  }

  // Function to handle form submission for creating or updating a product
  onSubmit() {
    if (this.productForm.valid) {
      const formData: ProductUpdateDto = this.productForm.value;

      if (this.isEdit && this.productId) {
        // Updating an existing product
        this.productControllerService
          .updateProductById(this.productId, formData)
          .subscribe(
            (product) => {
              Swal.fire('Updated!', 'The product has been updated.', 'success');
              this.router.navigate(['/products']);
            },
            (error) =>
              Swal.fire(
                'Error!',
                'There was a problem updating the product.',
                'error'
              )
          );
      } else {
        // Creating a new product
        this.productControllerService.createProduct(formData).subscribe(
          (product) => {
            Swal.fire('Created!', 'A new product has been created.', 'success');
            this.router.navigate(['/products']);
          },
          (error) =>
            Swal.fire(
              'Error!',
              'There was a problem creating the product.',
              'error'
            )
        );
      }
    } else {
      Swal.fire('Invalid Form', 'Please fill in all required fields.', 'error');
    }
  }

  // Function to delete a product
  delete() {
    if (this.productId) {
      // Confirmation dialog for deleting a product
      Swal.fire({
        title: 'Do you want to delete this product?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          // Deleting the product if confirmed
          this.productControllerService
            .deleteProductById(this.productId!)
            .subscribe(
              (product) => {
                Swal.fire(
                  'Deleted!',
                  'The product has been deleted.',
                  'success'
                );
                this.router.navigate(['/products']);
              },
              (error) =>
                Swal.fire(
                  'Error!',
                  'There was a problem deleting the product.',
                  'error'
                )
            );
        } else if (result.isDenied) {
          Swal.fire('Cancelled', 'The product is not deleted.', 'info');
        }
      });
    }
  }
}
