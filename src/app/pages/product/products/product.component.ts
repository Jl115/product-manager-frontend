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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pm-product',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  categories: ProductShowDto[] = [];
  filteredCategories: ProductShowDto[] = [];
  isLoading: boolean = false;
  isEdit: boolean = false;
  searchText: string = '';

  constructor(private productControllerService: ProductControllerService) {}

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
        this.filteredCategories = categories;
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
    this.filteredCategories = this.searchText
      ? this.categories.filter((category) =>
          category.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
      : this.categories;
  }
}
