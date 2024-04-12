import { Component, OnInit } from '@angular/core';
import { takeUntil, timeout } from 'rxjs';
import { MemoryLeaksProtectedComponent } from 'src/app/components/memory-leaks-protected.component';
import { Auth } from 'src/app/models/auth';
import { Building } from 'src/app/models/building';
import { AuthService } from 'src/app/services/auth.service';
import { BuildingService } from 'src/app/services/building.service';
import { IdShareService } from 'src/app/services/id-share.service';
import {ModalService} from 'src/app/services/modal.service';
import { EditBuildingComponent } from '../edit-building/edit-building.component';
import { GodComponent } from '../god/god.component';
import { BuildingResponse } from 'src/app/models/buildingResponse';



@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css']
})
export class ListBuildingComponent extends MemoryLeaksProtectedComponent {

  buildings: Building[] = [];
  auth: Auth = new Auth;

  constructor(private buildingService: BuildingService, private sharedId: IdShareService, private AuthService: AuthService, private ModalService: ModalService){
    super()
  }

  ngOnInit() : void{
    this.auth.role = this.AuthService.userRole
    this.getBuildings()
  }

  getBuildings(): void{
    if(this.AuthService.userRole === 'Admin'){
      this.buildingService.getBuildings()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: Building[]) => (this.buildings= result));
    }
    if(this.AuthService.userRole === 'User'){
      this.buildingService.getUserBuildings(this.AuthService.userProfile$.value?.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: Building[]) => (this.buildings= result));
    }
  }

  updateTable(buildings: BuildingResponse): void{
    console.log(buildings)

    if(buildings.action === 'create'){
      this.buildings.push(buildings)
      return
    }
    
    if(buildings.action === 'update'){
      this.buildings = this.buildings.filter(build => {
        return build.id !== buildings.id
      })
      this.buildings.push(buildings)
      return
    }

    if(buildings.action === 'delete'){
      this.buildings = this.buildings.filter(build => {
        return build.id !== buildings.id
      })
      return 
    }

  }

  shareIdOnRedirect(id: number){
    this.sharedId.changeIdBuilding(id);
  }

  editComponent(id: number | undefined){
    this.ModalService.modal(EditBuildingComponent, id);
    this.ModalService.modalRef.componentInstance.buildingsUpdated
    .pipe(takeUntil(this.destroyed$))
    .subscribe((buildings: BuildingResponse) => {
      this.updateTable(buildings)
    });
  }
  seePutin(){
    this.ModalService.modal(GodComponent, undefined)
  }

}