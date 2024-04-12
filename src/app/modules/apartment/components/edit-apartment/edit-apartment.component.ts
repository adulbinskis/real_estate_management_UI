import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs';
import { Apartment } from 'src/app/models/apartment';
import { ApartmentService } from 'src/app/services/apartment.service';
import { MemoryLeaksProtectedComponent } from 'src/app/components/memory-leaks-protected.component';
import { BuildingService } from 'src/app/services/building.service';
import { Building } from 'src/app/models/building';
import { ApartmentResponse } from 'src/app/models/apartmentResponse';
import { AuthService } from 'src/app/services/auth.service';
import { BuildingResponse } from 'src/app/models/buildingResponse';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.css']
})
export class EditApartmentComponent extends MemoryLeaksProtectedComponent  {
  @Input() data: any;
  @Output()  apartmentsUpdated = new EventEmitter<ApartmentResponse>(); //to update component
  apartmentForm: FormGroup | undefined;

  buildings: Building[] = [];

  constructor(
    private apartmentService: ApartmentService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    public activeModal: NgbActiveModal,
    private buildingService: BuildingService,
    private AuthService: AuthService
    ) 
  { 
    super();
    this.apartmentForm = this.fb.group({
      id: [null],
      number: ['', Validators.required],
      floor: ['', Validators.required],
      numberOfRooms: ['', Validators.required],
      numberOfTenants: ['', Validators.required],
      fullArea: ['', Validators.required],
      livingSpace: ['', Validators.required],
      buildingId: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.getBuildings()

    if(this.data.id !== undefined){
      this.apartmentService.getApartmentById(this.data.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: Apartment) =>(
        this.apartmentForm?.patchValue({
          id: result.id,
          number: result.number,
          floor: result.floor,
          numberOfRooms: result.numberOfRooms,
          numberOfTenants: result.numberOfTenants,
          fullArea: result.fullArea,
          livingSpace: result.livingSpace,
          buildingId: result.buildingId,
        })
      ));
    }else{
      this.apartmentForm?.reset
    }
  }
  getBuildings(): void{
    if(this.AuthService.userRole === 'Admin'){
      this.buildingService.getBuildings()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: BuildingResponse[]) => (this.buildings= result));
    }
    if(this.AuthService.userRole === 'User'){
      this.buildingService.getUserBuildings(this.AuthService.userProfile$.value?.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: BuildingResponse[]) => (this.buildings= result));
    }
  }

  closeModal(apartment: Apartment, action: string): void {
    switch (action) {
      case 'create': {
        this.apartmentForm?.markAllAsTouched();
        if (this.isValid()) {
          this.createApartment(apartment);
          this.activeModal.close();
        }
        break;
      }
      case 'update': {
        this.apartmentForm?.markAllAsTouched();
        if (this.isValid()) {
          this.updateApartment(apartment);
          this.activeModal.close();
        }
        break;
      }
      case 'delete': {
        this.deleteApartment(apartment);
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
    if (this.apartmentForm?.invalid) {
      alert('Validation error');
      return false;
    }
    return true;
  }

  updateApartment(apartment:Apartment){
    this.apartmentService
    .updateApartment(apartment)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((apartments: ApartmentResponse) => this.apartmentsUpdated.emit(apartments));
  }

  deleteApartment(apartment:Apartment){
    this.apartmentService
    .deleteApartment(apartment)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((apartments: ApartmentResponse) => this.apartmentsUpdated.emit(apartments));
  }
  
  createApartment(apartment:Apartment){
    this.apartmentService
    .createApartment(apartment)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((apartments: ApartmentResponse) => this.apartmentsUpdated.emit(apartments));
  }

}