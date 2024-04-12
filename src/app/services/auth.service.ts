import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Auth } from '../models/auth';
import { JWT } from '../models/jwt';
import { BehaviorSubject, catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { MemoryLeaksProtectedComponent } from '../components/memory-leaks-protected.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends MemoryLeaksProtectedComponent {
  private url = "Auth";

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.accessToken !== undefined);
  userProfile$: BehaviorSubject<Auth | undefined> = new BehaviorSubject<Auth | undefined>(undefined);

  get accessToken(): string | undefined {
    const token = localStorage.getItem('access_token');
    return token ? token : undefined;
  }

  get userRole(){
    return this.userProfile$.getValue()?.role;
  }
  get userId(){
    return this.userProfile$.getValue()?.id
  }


  constructor(private http: HttpClient) {
    super();
    this.isAuthenticated$
    .pipe(takeUntil(this.destroyed$))
    .subscribe(isAuthenticated => {
      if(isAuthenticated) {
        this.GetAuthenticatedUser()
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (userProfile: Auth | undefined) => this.userProfile$.next(userProfile),
          error: error => {
            console.log(error)
          }
        });
      }
      else{
        localStorage.clear();
        this.userProfile$.next(undefined);
      }
    });
  }

  authenticate(jwt: JWT): void {
    // console.log(jwt)
    localStorage.setItem('refresh_token', jwt.refreshToken);
    localStorage.setItem('access_token', jwt.accessToken);
    this.userProfile$.next({ 
      role: jwt.role, 
      id: jwt.userId
    });
    this.isAuthenticated$.next(true);
    // console.log(this.userProfile$)
  }

  login(auth: Auth): Observable<JWT>{
    var response = this.http.post<JWT>(`${environment.apiUrl}/${this.url}/${'login'}`, auth);
    return response
  }

  register(auth: Auth): Observable<Auth>{
    return this.http.post<Auth>(`${environment.apiUrl}/${this.url}/${'register'}`, auth)
  }

  GetAuthenticatedUser(): Observable<Auth>{
    return this.http
    .get<Auth>(`${environment.apiUrl}/${'User'}/${'GetAuthenticatedUser'}`)
    .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }
}

export interface UserProfile {
  role: string;
}