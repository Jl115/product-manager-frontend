import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProductComponent } from './pages/product/products/product.component';
import { CategoriesComponent } from './pages/category/categories/categories.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CategoryCreateComponent } from './pages/category/category-create-edit/category-create.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductCreateComponent } from './pages/product/product-create-edit/product-create.component';


import { adminGuard } from './guards/admin.guard';
import { ProductByCategoryComponent } from './pages/product/product-by-category/product-by-category.component';
import { AdminComponent } from './pages/user/admin/admin.component';



// Routes configuration
const routes: Routes = [
  {
    path: '', // Default route
    component: HomeComponent, // HomeComponent is displayed for the default route
    title: 'Home', // Title for the route
  },

  // Authentication routes
  {
    path: 'auth', // Base path for authentication routes
    children: [
      {
        path: 'login', // Route for login
        component: LoginComponent, // LoginComponent for the login page
      },
      {
        path: 'register', // Route for registration
        component: RegisterComponent, // RegisterComponent for the registration page
      },
    ],
  },
  // Category routes
  {
    path: 'categories', // Base path for category routes
    children: [
      {
        path: '', // Default route under categories
        component: CategoriesComponent, // CategoriesComponent displays all categories
      },
      {
        path: 'create', // Route for creating a category
        component: CategoryCreateComponent, // Component to create or edit a category
        canActivate: [adminGuard], // Protected by adminGuard to restrict access
      },
      {
        path: 'edit/:id', // Route for editing a specific category
        component: CategoryCreateComponent, // Reuses the CategoryCreateComponent for editing
        canActivate: [adminGuard], // Restricted access by adminGuard
      },
      {
        path: ':id/products', // Route to list products by category
        component: ProductByCategoryComponent, // Component to display products for a specific category
      },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [adminGuard],
  },
  // Product routes
  {
    path: 'products', // Base path for product routes
    children: [
      {
        path: '', // Default route under products
        component: ProductComponent, // Displays all products
      },
      {
        path: 'create', // Route for creating a product
        component: ProductCreateComponent, // Component for creating a product
      },
      {
        path: 'edit/:id', // Route for editing a specific product
        component: ProductCreateComponent, // Component for editing a product
      },
      {
        path: ':id', // Route for viewing product details
        component: ProductDetailComponent, // Component for displaying product details
      },
    ],
  },
  // Fallback route for unmatched paths
  { path: '**', component: PageNotFoundComponent }, // PageNotFoundComponent displayed for unknown routes
];

// Angular Routing Module for the application
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {}