import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiModule, Configuration } from './openapi-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from "./elements/header/header.component";
import { FooterComponent } from "./elements/footer/footer.component";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HomeComponent } from './pages/home/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';





@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TestComponent,

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: AuthInterceptor
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderComponent,
        FooterComponent,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSelectModule,
        MatFormFieldModule,
        HttpClientModule,
        ApiModule.forRoot(() => {
            return new Configuration({
                basePath: 'https://product-manager.cyrotech.ch'
            });
        }),
    ]
})
export class AppModule { }
