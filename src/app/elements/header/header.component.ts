import { Component, ElementRef, EventEmitter, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Route, RouterLink, RouterLinkWithHref } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'pm-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, RouterLink, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnChanges{

  @ViewChild('detailsElement') detailsElement: ElementRef | undefined;
@Output()  isSideBar = false;

@Output() newItemEvent = new EventEmitter<boolean>();
isLogin: boolean = false;
name: string = "test";
isEnter: boolean = false;

addIsSideBar(isSideBar: boolean) {
  this.newItemEvent.emit(isSideBar);
}





constructor(
  private renderer: Renderer2,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
  }
  ngOnInit(): void {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (token) {
        const payload: any = jwtDecode(token); // Dekodieren Sie das Token
        if (payload.email) { // Überprüfen Sie, ob die E-Mail-Adresse im Payload vorhanden ist
          this.name = payload.email; // Speichern Sie die E-Mail-Adresse
          this.isLogin = true; // Setzen Sie isLogin auf true, wenn das Token gültig ist
        }
      } else {
        this.isLogin = false;
      }
    } catch (error) {
      console.error('Error decoding token', error);
      this.isLogin = false;
    }
  }

getProfile() {
  this.isLogin = true;
  this.name = "Profile";
}
toggleDetails(categories: HTMLElement, open: boolean) {
  if (open) {
    this.renderer.setAttribute(categories, 'open', 'true');
  } else {
    this.renderer.removeAttribute(categories, 'open');
  }
}
}
