import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "User";

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public promoteUser(user: User): Observable<User[]>{
    return this.http.put<User[]>(`${environment.apiUrl}/${this.url}/${user.id}`, user.id)
  }

  public deleteUser(user: User): Observable<User[]>{
    return this.http.delete<User[]>(`${environment.apiUrl}/${this.url}/${user.id}`)
  }
}
