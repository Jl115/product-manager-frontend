// Importing Angular core components and modules
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryControllerService } from 'src/app/openapi-client';
import Swal from 'sweetalert2'; // Importing SweetAlert2 for alert dialogs

// Angular Component for creating and editing categories
@Component({
  selector: 'pm-category-create',   // Component's custom HTML tag
  templateUrl: './category-create.component.html', // HTML template file
  standalone: true,  // Indicates that the component is standalone
  imports: [ReactiveFormsModule, CommonModule], // Required modules for this component
  styleUrls: ['./category-create.component.scss'] // CSS styles for this component
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup;    // FormGroup to handle the category form
  isEdit: boolean = false;    // Flag to determine if the mode is edit or create
  categoryId: number | null = null; // Stores the ID of the category being edited

  constructor(
    private categoryControllerService: CategoryControllerService, // Service for category operations
    private router: Router,              // Angular Router for navigation
    private activatedRoute: ActivatedRoute // Service to access route parameters
  ) {
    // Initializing the category form with validators
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      isActive: new FormControl(true)
    });
  }

  ngOnInit() {
    // Checks if an ID is passed in the route, indicating edit mode
    const categoryId = this.activatedRoute.snapshot.params['id'];
    if (categoryId) {
      this.isEdit = true; // Set edit mode
      // Fetch category details and populate the form
      this.categoryControllerService.getCategoryById(categoryId).subscribe(category => {
        this.categoryForm.patchValue({
          categoryName: category.name,
          isActive: category.active
        });
        this.categoryId = category.id;
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.isEdit && this.categoryId) {
        // Update existing category
        this.categoryControllerService.updateCategoryById(this.categoryId, {
          name: this.categoryForm.value.categoryName,
          active: this.categoryForm.value.isActive
        }).subscribe(
          category => {
            console.log('Category updated:', category);
            this.router.navigate(['/categories']); // Navigate to categories list
          },
          error => console.error('Error updating category:', error)
        );
      } else {
        // Create new category
        this.categoryControllerService.createCategory({
          name: this.categoryForm.value.categoryName,
          active: this.categoryForm.value.isActive
        }).subscribe(
          category => {
            console.log('Category created:', category);
            this.router.navigate(['/categories']); // Navigate to categories list
          },
          error => console.error('Error creating category:', error)
        );
      }
    }
  }

  // Method to delete a category
  delete() {
    // Confirmation dialog using SweetAlert2
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        // Delete the category if confirmed
        this.categoryControllerService.deleteCategoryById(this.categoryId!).subscribe(
          category => {
            console.log('Category deleted:', category);
            this.router.navigate(['/categories']); // Navigate to categories list
          },
        );
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}
