import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryControllerService } from 'src/app/openapi-client/api/categoryController.service';
import { CategoryDetailDto, CategoryShowDto, ProductShowDto } from 'src/app/openapi-client';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pm-product-by-category',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, ],
  templateUrl: './product-by-category.component.html',
  styleUrl: './product-by-category.component.scss',
})
export class ProductByCategoryComponent {
  // Arrays to store categories and filtered categories
  categories: CategoryDetailDto[] = [];
  filteredCategories: CategoryDetailDto[] = [];

  // Flags for loading state and edit mode
  isLoading: boolean = false;
  isEdit: boolean = false;
  categoryId: number | null = null;
  // String for search text input
  searchText: string = '';

  // Injecting the CategoryControllerService for API calls
  constructor(private categoryControllerService: CategoryControllerService, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Fetches category ID from route params
    this.categoryId = this.activatedRoute.snapshot.params['id'];
    // Sets isLoading to true and initiates category loading after a delay
    this.isLoading = true;
    setTimeout(() => {
      this.loadCategories();
    }, 800);
  }

  loadCategories() {
    // Fetches categories from the server and handles loading state
    this.isLoading = true;
    this.categoryControllerService.getCategoryById(this.categoryId!).subscribe(
      (categories) => {
        // On success, updates category arrays and sets loading to false
        this.categories = [categories];
        this.filteredCategories = [categories];
        this.isLoading = false;
        console.log(categories);
      },
      (error) => {
        // On error, logs the error and updates loading state
        console.error('Error loading categories:', error);
        this.isLoading = false;
      }
    );
  }

  onSearch() {
    console.log('Suchtext:', this.searchText);
    const searchLower = this.searchText.trim().toLowerCase();
  
    this.filteredCategories = this.searchText
      ? this.categories.filter(category => {
          const matchingProducts = category.products.filter(product => 
            product.name.toLowerCase().includes(searchLower) 
          );
          console.log('Passende Produkte in Kategorie:', category.name, matchingProducts);
          return matchingProducts.length > 0;
        })
      : this.categories;
      this.cdr.detectChanges();
    console.log('Gefilterte Kategorien:', this.filteredCategories);
  }
  
  filterProductsInCategory(category: { products: any[]; }, searchText: string) {
    if (!searchText) return category.products;
    return category.products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  
  

}
