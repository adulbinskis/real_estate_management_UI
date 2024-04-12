import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http'

import { EditApartmentComponent } from './components/edit-apartment/edit-apartment.component';
import { ListApartmentComponent } from './components/list-apartment/list-apartment.component';
import {ApartmentRoutingModule} from './apartment-routing.module'


@NgModule({
  declarations: [
    EditApartmentComponent,
    ListApartmentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    HttpClientModule,
    ApartmentRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ApartmentModule { }
