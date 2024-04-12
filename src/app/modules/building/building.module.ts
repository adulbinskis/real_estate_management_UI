import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { EditBuildingComponent } from './components/edit-building/edit-building.component';
import { ListBuildingComponent } from './components/list-building/list-building.component';
import { BuildingRoutingModule } from './building-routing.module';
import { GodComponent } from './components/god/god.component';




@NgModule({
  declarations: [
    EditBuildingComponent,
    ListBuildingComponent,
    GodComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    BuildingRoutingModule,
    ReactiveFormsModule,
  ]
})
export class BuildingModule { }
