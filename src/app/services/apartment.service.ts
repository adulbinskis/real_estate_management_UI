import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Apartment } from '../models/apartment';
import { environment } from 'src/environments/environment';
import { ApartmentResponse } from '../models/apartmentResponse';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private url = "Apartment";

  constructor(private http: HttpClient) { }

  public getApartmentById(id:string): Observable<ApartmentResponse>{
    return this.http.get<ApartmentResponse>(`${environment.apiUrl}/${this.url}/${id}`)
  }

  public getApartments(): Observable<ApartmentResponse[]>{
    return this.http.get<ApartmentResponse[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getBuildingApartmentById(id:number): Observable<ApartmentResponse[]>{
    return this.http.get<ApartmentResponse[]>(`${environment.apiUrl}/${this.url}/${'GetBuildingApartment'}/${id}`);
  }
  public getUserApartments(userId?: number): Observable<ApartmentResponse[]>{
    return this.http.get<ApartmentResponse[]>(`${environment.apiUrl}/${this.url}/GetUserApartments/${userId}`)
  }

  public updateApartment(apartment: Apartment): Observable<ApartmentResponse>{
    return this.http.put<ApartmentResponse>(
      `${environment.apiUrl}/${this.url}/${apartment.id}` ,
      apartment
    );
  }

  public createApartment(apartment: Apartment): Observable<ApartmentResponse>{
    console.log(apartment)
    return this.http.post<ApartmentResponse>(
      `${environment.apiUrl}/${this.url}` ,
      apartment
    );
  }

  public deleteApartment(apartment: Apartment): Observable<ApartmentResponse>{
    return this.http.delete<ApartmentResponse>(
      `${environment.apiUrl}/${this.url}/${apartment.id}`
    );
  }
}
