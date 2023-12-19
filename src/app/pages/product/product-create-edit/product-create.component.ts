import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CategoryControllerService,
  CategoryShowDto,
  ProductControllerService,
  ProductUpdateDto
} from 'src/app/openapi-client'; // Angenommener Service
import Swal from 'sweetalert2';

@Component({
  selector: 'pm-product-create',
  templateUrl: './product-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;
  isEdit: boolean = false;
  productId: number | null = null;
  categories: CategoryShowDto[] = [];

  constructor(
    private productControllerService: ProductControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryControllerService: CategoryControllerService
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sku: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoryId: new FormControl('', [Validators.required]),
      isActive: new FormControl(true)
    });
  }

  ngOnInit() {
    this.categoryControllerService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => console.error('Error loading categories:', error)
    );

    const productId = this.activatedRoute.snapshot.params['id'];
    if (productId) {
      this.isEdit = true;
      this.productId = productId;
      this.productControllerService.getProductById(productId).subscribe(
        product => {
          this.productForm.patchValue({
            name: product.name,
            sku: product.sku,
            description: product.description,
            image: product.image,
            price: product.price,
            stock: product.stock,
            categoryId: product.category,
            isActive: product.active
          });
        },
        error => console.error('Error fetching product:', error)
      );
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData: ProductUpdateDto = this.productForm.value;

      if (this.isEdit && this.productId) {
        this.productControllerService.updateProductById(this.productId, formData).subscribe(
          product => {
            Swal.fire("Updated!", "The product has been updated.", "success");
            this.router.navigate(['/products']);
          },
          error => {
            Swal.fire("Error!", "There was a problem updating the product.", "error");
          }
        );
      } else {
        this.productControllerService.createProduct(formData).subscribe(
          product => {
            Swal.fire("Created!", "A new product has been created.", "success");
            this.router.navigate(['/products']);
          },
          error => {
            Swal.fire("Error!", "There was a problem creating the product.", "error");
          }
        );
      }
    } else {
      Swal.fire("Invalid Form", "Please fill in all required fields.", "error");
    }
  }

  delete() {
    if (this.productId) {
      Swal.fire({
        title: "Do you want to delete this product?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Cancel`
      }).then((result) => {
        if (result.isConfirmed) {
          this.productControllerService.deleteProductById(this.productId!).subscribe(
            product => {
              Swal.fire("Deleted!", "The product has been deleted.", "success");
              this.router.navigate(['/products']);
            },
            error => {
              Swal.fire("Error!", "There was a problem deleting the product.", "error");
            }
          );
        } else if (result.isDenied) {
          Swal.fire("Cancelled", "The product is not deleted.", "info");
        }
      });
    }
  }
}
