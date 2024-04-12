import { Component, OnInit } from '@angular/core';
import { Apartment } from 'src/app/models/apartment';
import { Auth } from 'src/app/models/auth';
import { ApartmentService } from 'src/app/services/apartment.service';
import { AuthService } from 'src/app/services/auth.service';
import { IdShareService } from 'src/app/services/id-share.service';
import { EditApartmentComponent } from '../edit-apartment/edit-apartment.component';
import {ModalService} from 'src/app/services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { MemoryLeaksProtectedComponent } from 'src/app/components/memory-leaks-protected.component';
import { ApartmentResponse } from 'src/app/models/apartmentResponse';

@Component({
  selector: 'app-list-apartment',
  templateUrl: './list-apartment.component.html',
  styleUrls: ['./list-apartment.component.css']
})
export class ListApartmentComponent extends MemoryLeaksProtectedComponent {
  
  apartments: Apartment[] = [];
  auth: Auth = new Auth;
  id: string| undefined;

  constructor( 
    private apartmentService: ApartmentService, 
    public route: ActivatedRoute, 
    private sharedId: IdShareService, 
    private AuthService: AuthService, 
    private ModalService: ModalService
  ){
    super()
  }

  ngOnInit() : void{
    this.auth.role = this.AuthService.userRole
    this.getApartments()
  }

  getApartments():void{
    if(this.AuthService.userRole === 'Admin'){
      this.apartmentService.getApartments()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((result: Apartment[]) => (
          this.apartments = result.filter(apart => { 
            if(this.route.snapshot.params['id'] !== undefined ){
              return apart.buildingId == this.route.snapshot.params['id'] 
            }else{
              return apart
            }
          }))
        );
    }
    if(this.AuthService.userRole === 'User'){
      this.apartmentService.getUserApartments(this.AuthService.userProfile$.value?.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: Apartment[]) => (
        this.apartments = result.filter(apart => {
          if(this.route.snapshot.params['id'] !== undefined ){
            return apart.buildingId == this.route.snapshot.params['id'] 
          }else{
            return apart
          }
        }))
      );
    }
  }


  updateTable(apartments: ApartmentResponse): void{
    console.log(apartments)

    if(apartments.action === 'delete'){
      this.apartments = this.apartments.filter(apart => {
        return apart.id !== apartments.id
      })
      return 
    } 

    if(apartments.action === 'create'){
      this.apartments.push(apartments)
      return
    }

    if(apartments.action === 'update'){
      this.apartments = this.apartments.filter(build => {
        return build.id !== apartments.id
      })
      this.apartments.push(apartments)
      return
    }

  }

  shareIdOnRedirect(id: number){
    this.sharedId.changeIdApartment(id);
  }

  editComponent(id: number | undefined){
    this.ModalService.modal(EditApartmentComponent, id);
    this.ModalService.modalRef.componentInstance.apartmentsUpdated
    .pipe(takeUntil(this.destroyed$))
    .subscribe((apartments: ApartmentResponse) => {
      this.updateTable(apartments)
    });
  }
}
