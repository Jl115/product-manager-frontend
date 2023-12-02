import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProductComponent } from './pages/product/products/product.component';
import { CategoriesComponent } from './pages/category/categories/categories.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CategoryDetailComponent } from './pages/category/category-detail/category-detail.component';
import { CategoryCreateComponent } from './pages/category/category-create/category-create.component';
import { CategoryEditComponent } from './pages/category/category-edit/category-edit.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductCreateComponent } from './pages/product/product-create/product-create.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'test',
    component: TestComponent,
    title: 'Test',
  },
  // Authentifications routes
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        component: CategoriesComponent,
      },
      
      {
        path: 'create',
        component: CategoryCreateComponent,
      },
      {
        path: 'edit/:id',
        component: CategoryEditComponent,
      },
      {
        path: ':id',
        component: CategoryDetailComponent,
      },
    ],
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductComponent,
      },
      {
        path: 'create',
        component: ProductCreateComponent,
      },
      {
        path: 'edit/:id',
        component: ProductEditComponent,
      },
      {
        path: ':id',
        component: ProductDetailComponent,
      },
    ],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
