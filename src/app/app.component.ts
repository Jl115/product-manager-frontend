import { Component } from '@angular/core';
import { UserControllerService, CategoryControllerService, ProductControllerService } from './openapi-client/api/api';


@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-manager-frontend';


  constructor(
    private readonly userControllerService: UserControllerService,
    private readonly categoryControllerService: CategoryControllerService,
    private readonly productControllerService: ProductControllerService
  ) { 
    // console.log("usertestlog");
    // this.userControllerService.getAllUsers().subscribe(users => console.log(users));
    // this.categoryControllerService.getCategoryById(1).subscribe(category => console.log(category));
    // this.productControllerService.getAllProducts().subscribe(product => console.log(product));
  }
}
