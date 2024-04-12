import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Building } from 'src/app/models/building';
import { BuildingService } from 'src/app/services/building.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MemoryLeaksProtectedComponent } from 'src/app/components/memory-leaks-protected.component';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BuildingResponse } from 'src/app/models/buildingResponse';

@Component({
  selector: 'app-edit-building', 
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css'],
  providers: [],
})
export class EditBuildingComponent extends MemoryLeaksProtectedComponent {
  @Input() data: any;
  @Output() buildingsUpdated = new EventEmitter<BuildingResponse>(); //to update component
  buildingForm: FormGroup | undefined;
  public color: string = 'rgb(236,64,64)';
  
  constructor(
    private buildingService: BuildingService, 
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    public activeModal: NgbActiveModal, 
    private authService: AuthService,
    ) {
    super();
    this.buildingForm = this.fb.group({
      id: [null],
      code: ['', [Validators.required, Validators.min(2), Validators.max(1000), Validators.pattern('^\[0-9]+')]],
      street: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern('^[A-ZĀČĒĢĪĶĻŅŌŖŠŪŽ][ a-zāčēģīķļņōŗšūž#.0-9a-zA-Z\s,-]+$')]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-ZĀČĒĢĪĶĻŅŌŖŠŪŽ][a-zāčēģīķļņōŗšūž]{1,49}(\[a-zāčēģīķļņōŗšūž]{2,50})?$')]],
      country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern('^[A-ZĀČĒĢĪĶĻŅŌŖŠŪŽ][a-zāčēģīķļņōŗšūž]{1,59}(\[a-zāčēģīķļņōŗšūž]{2,60})?$')]],
      postalCode: ['', [Validators.required, Validators.pattern('^(LV-)[0-9]{4}$')]],
      userId: ['']
    });
   }

  ngOnInit(): void {
    if(this.data.id !== undefined){
      this.buildingService.getBuildingById(this.data.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: Building) =>(
        this.buildingForm?.patchValue({
        id: result.id,
        code: result.code,
        street: result.street,
        city: result.city,
        country: result.country,
        postalCode: result.postalCode,
        userId: this.authService.userProfile$.value?.id
     })));
      
    }else{
      this.buildingForm?.reset
      this.buildingForm?.patchValue({
        userId: this.authService.userProfile$.value?.id
      })
      
    } 
  }
  
  closeModal(building:Building, action: string): void{
    switch(action) { 
      case 'create': { 
        this.buildingForm?.markAllAsTouched();
         if(this.isValid())
          this.createBuilding(building)
         break; 
      } 
      case 'update': { 
        this.buildingForm?.markAllAsTouched();
        if(this.isValid())
          this.updateBuilding(building)
         break; 
      } 
      case 'delete': { 
        this.deleteBuilding(building)
        this.activeModal.close()
        break; 
      }
      case 'close': { 
        this.activeModal.close()
        break; 
      }  
   } 
    
  }
  isValid():boolean{
    if(this.buildingForm?.status === "INVALID"){
      alert('Validation error')
      return false
    }
    this.activeModal.close()
    return true
  }

  createBuilding(building:Building){
    console.log(building)
    this.buildingService
    .createBuilding(building)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((buildings: BuildingResponse) => this.buildingsUpdated.emit(buildings));
  }
  updateBuilding(building:Building):void{
    this.buildingService
    .updateBuilding(building)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((buildings: BuildingResponse) => this.buildingsUpdated.emit(buildings));
  }

  deleteBuilding(building:Building){
    this.buildingService
    .deleteBuilding(building)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((buildings: BuildingResponse) => this.buildingsUpdated.emit(buildings));
  }
  


}

