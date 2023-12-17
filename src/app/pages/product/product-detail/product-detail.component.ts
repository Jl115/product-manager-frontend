import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ProductControllerService, ProductDetailDto } from 'src/app/openapi-client';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';


@Component({
  selector: 'pm-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: ProductDetailDto | null = null;
  productId: number | null = null;




  constructor(
    private  productControllerService: ProductControllerService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {}
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.loadProduct();

  }
  loadProduct() {
    this.productControllerService.getProductById(this.productId!).subscribe(
      (product) => {
        this.product = product;
        console.log(product);
      },
      (error) => {
        console.error('Error loading product:', error);
      }
    );
  }
  navigateBack() {
    this.location.back();
    }
}
