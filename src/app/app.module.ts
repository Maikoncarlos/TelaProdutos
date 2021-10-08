import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosPageComponent } from './page/produtos-page/produtos-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatIconModule } from '@angular/material/icon';
import { FilterPipe } from './pipes/filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    ProdutosPageComponent,
    AlertComponent,
    FilterPipe
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }
