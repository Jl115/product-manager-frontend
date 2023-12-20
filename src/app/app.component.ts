import { Component } from '@angular/core';
import {
  UserControllerService,
  CategoryControllerService,
  ProductControllerService,
} from './openapi-client/api/api';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'product-manager-frontend';

  constructor() {}
}
