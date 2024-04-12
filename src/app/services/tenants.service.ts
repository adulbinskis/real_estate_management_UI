import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Tenant } from '../models/tenant';
import { environment } from 'src/environments/environment';
import { TenantResponse} from '../models/tenantResponse';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {
  private url = "Tenant";

  constructor(private http: HttpClient) { }

  public getUserTenant(userId?: number): Observable<TenantResponse[]>{
    return this.http.get<TenantResponse[]>(`${environment.apiUrl}/${this.url}/GetUserTenants/${userId}`)
  }

  public getApartmentTenantById(id:number): Observable<Tenant[]>{
    return this.http.get<Tenant[]>(`${environment.apiUrl}/${this.url}/${'GetApartmentTenants'}/${id}`);
  }

  public getTenantById(id:string): Observable<Tenant>{
    return this.http.get<Tenant>(`${environment.apiUrl}/${this.url}/${id}`)
  }

  public getTenants(): Observable<Tenant[]>{
    return this.http.get<Tenant[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateTenant(tenant: Tenant): Observable<TenantResponse>{
    return this.http.put<TenantResponse>(
      `${environment.apiUrl}/${this.url}/${tenant.id}` ,
      tenant
    );
  }

  public createTenant(tenant: Tenant): Observable<TenantResponse>{
    return this.http.post<TenantResponse>(
      `${environment.apiUrl}/${this.url}` ,
      tenant
    );
  }

  public deleteTenant(tenant: Tenant): Observable<TenantResponse>{
    return this.http.delete<TenantResponse>(
      `${environment.apiUrl}/${this.url}/${tenant.id}`
    );
  }
}
