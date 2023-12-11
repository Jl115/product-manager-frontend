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

import { CategoryCreateComponent } from './pages/category/category-create-edit/category-create.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductCreateComponent } from './pages/product/product-create/product-create.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { adminGuard } from './guards/admin.guard';
import { ProductByCategoryComponent } from './pages/product/product-by-category/product-by-category.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
  path: 'impressum',
  component: ImpressumComponent,
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
        canActivate: [adminGuard],
      },
      {
        path: 'edit/:id',
        component: CategoryCreateComponent,
        canActivate: [adminGuard],
      },
      {
        path: ':id/products',
        component: ProductByCategoryComponent,

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
