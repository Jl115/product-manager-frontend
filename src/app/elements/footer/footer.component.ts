import { Component, Input } from '@angular/core';
// Importing Component and Input from Angular core for component creation and property binding

import { CommonModule } from '@angular/common';
// Importing CommonModule for common directives like ngIf, ngFor

import { RouterLink } from '@angular/router';
// Importing RouterLink for enabling router link directives within the component's template

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
// Importing various Material modules for using Material design components like icons, buttons, toolbars, and chips

@Component({
  selector: 'pm-footer',
  // Declaring the selector name for this component to be used in other templates

  standalone: true,
  // Enabling standalone component feature, making this component independent of any NgModule

  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterLink
  ],
  // Specifying the imports required for this standalone component

  templateUrl: './footer.component.html',
  // Linking to an external HTML template file for this component

  styleUrls: ['./footer.component.scss'],
  // Linking to an external SCSS stylesheet for this component
})
export class FooterComponent {
  // Defining the class for the FooterComponent

  constructor() {}
  // An empty constructor, used for dependency injection if needed

  @Input()
  defaultColor="primary";
  // An Input property named defaultColor, allowing parent components to set this property. Default value is "primary"
}
