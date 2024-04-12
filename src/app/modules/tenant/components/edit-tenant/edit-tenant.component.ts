import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Tenant } from 'src/app/models/tenant';
import { TenantsService } from 'src/app/services/tenants.service';
import { MemoryLeaksProtectedComponent } from 'src/app/components/memory-leaks-protected.component';
import { NgbActiveModal, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs';
import { Apartment } from 'src/app/models/apartment';
import { ApartmentService } from 'src/app/services/apartment.service';
import { DatePipe } from '@angular/common';
import { TenantResponse } from 'src/app/models/tenantResponse';
import { ApartmentResponse } from 'src/app/models/apartmentResponse';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.css'],
  providers: [DatePipe]
})
export class EditTenantComponent extends MemoryLeaksProtectedComponent {
  @Input() data: any;
  @Output() tenantsUpdated = new EventEmitter<TenantResponse>(); //to update component tenantForm.get('dateOfBirth')?.value
  tenantForm: FormGroup;
  apartments: ApartmentResponse[] = [];


  date: NgbDateStruct = { year: 1789, month: 7, day: 14 }
  
  buildingService: any;

  constructor(
    private tenantsService: TenantsService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    public activeModal: NgbActiveModal, 
    private apartmentService: ApartmentService,
    public datePipe: DatePipe,
    private AuthService: AuthService
  )
  {
    super();


    this.tenantForm = this.fb.group({
      id: [null],
      personalCode: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      apartmentId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getApartments()
    
    if(this.data.id !== undefined){
      this.tenantsService.getTenantById(this.data.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: Tenant) =>(
        
        this.getDate(result),

        this.tenantForm?.patchValue({
        id: result.id,
        personalCode: result.personalCode,
        name: result.name,
        surname: result.surname,
        dateOfBirth: this.date,
        phone: result.phone,
        email: result.email,
        apartmentId: result.apartmentId,
     })));
      
    }else{
      this.tenantForm?.reset
      
    } 
  }
  getApartments(): void{
    if(this.AuthService.userRole === 'Admin'){
      this.apartmentService.getApartments()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: ApartmentResponse[]) =>(this.apartments = result));
    }
    if(this.AuthService.userRole === 'User'){
      this.apartmentService.getUserApartments(this.AuthService.userProfile$.value?.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: ApartmentResponse[]) => (this.apartments= result));
    }
  }
  getDate(result: Tenant): void {
    if (this.date) {
      const denchik = new Date(result.dateOfBirth)
      this.date.year = denchik.getFullYear();
      this.date.month = denchik.getMonth() + 1;
      this.date.day = denchik.getDate();
    }
  }

  closeModal(tenant: any, action: string): void {
    tenant.dateOfBirth = new Date(tenant.dateOfBirth.year, tenant.dateOfBirth.month - 1, tenant.dateOfBirth.day);
    console.log(tenant)

    switch (action) {
      case 'create': {
        this.tenantForm.markAllAsTouched();
        if (this.isValid()) {
          this.createTenant(tenant);
          this.activeModal.close();
        }
        break;
      }
      case 'update': {
        this.tenantForm.markAllAsTouched();
        if (this.isValid()) {
          this.updateTenant(tenant);
          this.activeModal.close();
        }
        break;
      }
      case 'delete': {
        this.deleteTenant(tenant);
        this.activeModal.close();
        break;
      }
      case 'close': {
        this.activeModal.close();
        break;
      }
    }
  }
  
  isValid(): boolean {
    if (this.tenantForm?.invalid) {
      alert('Validation error')
      return false;
    }
    return true;
  }

  updateTenant(tenant:Tenant){
    this.tenantsService
    .updateTenant(tenant)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((tenants: TenantResponse) => this.tenantsUpdated.emit(tenants));
  }

  deleteTenant(tenant:Tenant){
    this.tenantsService
    .deleteTenant(tenant)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((tenants: TenantResponse) => this.tenantsUpdated.emit(tenants));
  }
  
  createTenant(tenant:Tenant){
    this.tenantsService
    .createTenant(tenant)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((tenants: TenantResponse) => this.tenantsUpdated.emit(tenants));
  }
}
