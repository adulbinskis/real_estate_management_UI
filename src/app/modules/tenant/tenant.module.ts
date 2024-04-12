import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http'

import { ListTenantsComponent } from './components/list-tenant/list-tenant.component';
import { TenantRoutingModule } from './tenant-routing.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTenantComponent } from './components/edit-tenant/edit-tenant.component';




@NgModule({
  declarations: [
    ListTenantsComponent,
    EditTenantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    TenantRoutingModule,
    ReactiveFormsModule,
    NgbModule

  ]
})
export class TenantModule { }
