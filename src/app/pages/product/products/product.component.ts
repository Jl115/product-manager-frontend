import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductControllerService } from 'src/app/openapi-client/api/productController.service';
import { ProductShowDto } from 'src/app/openapi-client';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { NavigationEnd, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'pm-product',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  categories: ProductShowDto[] = [];
  filteredProducts: ProductShowDto[] = [];
  isLoading: boolean = false;
  isEdit: boolean = false;
  searchText: string = '';

  constructor(private productControllerService: ProductControllerService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
      }
  })
}

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.loadCategories();
    }, 800);
  }

  loadCategories() {
    this.isLoading = true;
    this.productControllerService.getAllProducts().subscribe(
      (categories) => {
        this.categories = categories;
        this.filteredProducts = categories;
        this.isLoading = false;
        console.log(categories);
      },
      (error) => {
        console.error('Error loading categories:', error);
        this.isLoading = false;
      }
    );
  }
  onSearch() {
    this.filteredProducts = this.searchText
      ? this.categories.filter((category) =>
          category.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
      : this.categories;
  }
}
