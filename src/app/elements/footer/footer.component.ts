// Angular core imports for defining a component and enabling input property binding
import { Component, Input } from '@angular/core';

// Import for Angular's CommonModule to use common directives in this component
import { CommonModule } from '@angular/common';

// Import for RouterLink directive to enable linking to different routes
import { RouterLink } from '@angular/router';

// Imports for Angular Material modules to utilize UI components like icons, buttons, toolbar, and chips
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';

// Defines the class for the FooterComponent
@Component({
  selector: 'pm-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterLink,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  // Constructor can be used for dependency injection if needed in the future
  constructor() {}

  // Input property 'defaultColor' allows parent components to set the color. Defaults to "primary"
  @Input() defaultColor = 'primary';
}
