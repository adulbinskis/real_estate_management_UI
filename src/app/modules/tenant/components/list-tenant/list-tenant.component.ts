import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { MemoryLeaksProtectedComponent } from 'src/app/components/memory-leaks-protected.component';
import { Auth } from 'src/app/models/auth';
import { Tenant } from 'src/app/models/tenant';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { TenantsService } from 'src/app/services/tenants.service';

import { TenantResponse } from 'src/app/models/tenantResponse';
import { EditTenantComponent } from '../edit-tenant/edit-tenant.component';


@Component({
  selector: 'app-list-tenants',
  templateUrl: './list-tenant.component.html',
  styleUrls: ['./list-tenant.component.css'],
  providers: [DatePipe]
})
export class ListTenantsComponent extends MemoryLeaksProtectedComponent {

  tenants: Tenant[] = [];
  auth: Auth = new Auth;

  constructor(
    private tenantsService: TenantsService,
     private AuthService: AuthService, 
     private modalService: ModalService,
     public route: ActivatedRoute,
     public datePipe: DatePipe
  ){
    super();
  }

  ngOnInit() : void{
    this.auth.role = this.AuthService.userRole
    this.getTenants()
  }

  getTenants():void{
    if(this.AuthService.userRole === 'Admin'){
      this.tenantsService.getTenants()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((result: Tenant[]) => (
          this.tenants = result.filter(ten => { 
            if(this.route.snapshot.params['id'] !== undefined){
              return ten.apartmentId == this.route.snapshot.params['id'] 
            }else{
              return ten
            }
          }))
        );
    }
    if(this.AuthService.userRole === 'User'){
      this.tenantsService.getUserTenant(this.AuthService.userProfile$.value?.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: Tenant[]) => (
        this.tenants = result.filter(ten => { 
          if(this.route.snapshot.params['id'] !== undefined){
            return ten.apartmentId == this.route.snapshot.params['id'] 
          }else{
            return ten
          }
        }))
      );
    }
  }

  updateTable(tenants: TenantResponse): void{
    console.log(tenants)

    if(tenants.action === 'delete'){
      this.tenants = this.tenants.filter(ten => {
        return ten.id !== tenants.id
      })
      return 
    } 

    if(tenants.action === 'create'){
      this.tenants.push(tenants)
      return
    }

    if(tenants.action === 'update'){
      this.tenants = this.tenants.filter(ten => {
        return ten.id !== tenants.id
      })
      this.tenants.push(tenants)
      return
    }

  }

  editComponent(id: undefined| number){
    this.modalService.modal(EditTenantComponent, id)
    this.modalService.modalRef.componentInstance.tenantsUpdated
      .pipe(takeUntil(this.destroyed$))
      .subscribe((tenant: TenantResponse)=>{
        this.updateTable(tenant)
      })
  }

}
