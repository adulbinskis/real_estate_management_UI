import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdShareService {

  private idSourceApartmentToTenant = new BehaviorSubject<number>(0);
  currentIdApartment = this.idSourceApartmentToTenant.asObservable();

  private idSourceBuildingToApartment = new BehaviorSubject<number>(0);
  currentIdBuilding = this.idSourceBuildingToApartment.asObservable();

  constructor() { }

  changeIdApartment(id: number){
    this.idSourceApartmentToTenant.next(id)
  }

  changeIdBuilding(id: number){
    this.idSourceBuildingToApartment.next(id)
  }
}
