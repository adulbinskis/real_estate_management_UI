import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Building } from '../models/building';
import { environment } from 'src/environments/environment';
import { BuildingResponse } from '../models/buildingResponse';

@Injectable({
  providedIn: 'root'
})

export class BuildingService {
  private url = "Building";

  constructor(private http: HttpClient) { }

  public getBuildingById(id:string): Observable<BuildingResponse>{
    return this.http.get<BuildingResponse>(`${environment.apiUrl}/${this.url}/${id}`)
  }

  public getBuildings(): Observable<BuildingResponse[]>{
    return this.http.get<BuildingResponse[]>(`${environment.apiUrl}/${this.url}`);
  }
  public getUserBuildings(userId?: number): Observable<BuildingResponse[]>{
    return this.http.get<BuildingResponse[]>(`${environment.apiUrl}/${this.url}/GetUserBuildings/${userId}`)
  }

  public updateBuilding(building: Building): Observable<BuildingResponse>{
    console.log(building)
    return this.http.put<BuildingResponse>(
      `${environment.apiUrl}/${this.url}/${building.id}` ,
      building
    );
  }

  public createBuilding(building: Building): Observable<BuildingResponse>{
    console.log(building)
    return this.http.post<BuildingResponse>(
      `${environment.apiUrl}/${this.url}`,
      building
    );
  }

  public deleteBuilding(building: Building): Observable<BuildingResponse>{
    console.log(building)
    return this.http.delete<BuildingResponse>(
      `${environment.apiUrl}/${this.url}/${building.id}`
    );
  }

  
}
