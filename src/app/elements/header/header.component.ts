import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Route, RouterLink, RouterLinkWithHref } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'pm-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, RouterLink, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges{


@Output()  isSideBar = false;

@Output() newItemEvent = new EventEmitter<boolean>();
isLogin: boolean = false;
name: string = "test";

addIsSideBar(isSideBar: boolean) {
  this.newItemEvent.emit(isSideBar);
}





constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
  }
hamButton() {
  this.isSideBar = !this.isSideBar;
  this.addIsSideBar(this.isSideBar);
  console.log(this.isSideBar);
}

getProfile() {
  this.isLogin = true;
  this.name = "Profile";
}

}
