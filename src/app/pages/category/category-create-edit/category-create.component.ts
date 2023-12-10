import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryControllerService } from 'src/app/openapi-client';

@Component({
  selector: 'pm-category-create',
  templateUrl: './category-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm: FormGroup;
  isEdit: boolean = false;
  categoryId: number | null = null;

  constructor(
    private categoryControllerService: CategoryControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      isActive: new FormControl(true)
    });
  }

  ngOnInit() {
    const categoryId = this.activatedRoute.snapshot.params['id'];
    if (categoryId) {
      this.isEdit = true;
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
            this.router.navigate(['/categories']);
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
            this.router.navigate(['/categories']);
          },
          error => console.error('Error creating category:', error)
        );
      }
    }
  }
  delete() {
    this.categoryControllerService.deleteCategoryById(this.categoryId!).subscribe(
      category => {
        console.log('Category deleted:', category);
        this.router.navigate(['/categories']);
      },
    );
    }
}
