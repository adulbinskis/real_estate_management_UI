import { Component } from '@angular/core'; 
import { AuthService } from './services/auth.service';
import { OnDestroy } from '@angular/core';
import { Subscription, takeUntil } from 'rxjs';
import { MemoryLeaksProtectedComponent } from './components/memory-leaks-protected.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent extends MemoryLeaksProtectedComponent {
  title = 'Building.UI';
  role?: string;
  isAuth?: boolean;

  headerItems: HeaderItem[] = headerItemsForUnauthenticatedUser;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() : void{
  this.authService.userProfile$
    .pipe(takeUntil(this.destroyed$))
    .subscribe(userProfile => {
      if (!userProfile) {
        this.headerItems = headerItemsForUnauthenticatedUser;
      }
      else {
        this.headerItems = userProfile.role === 'Admin' ? headerItemsForAdmin : headerItemsForAuthenticatedUser;
      }
      this.role = this.authService.userRole
    });

    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(isAuthenticated =>{
        this.isAuth = isAuthenticated
      })
  }

  logOut():void{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    this.authService.userProfile$.next(undefined)
    this.authService.isAuthenticated$.next(false)
  } 
}


export interface HeaderItem {
  title: string;
  link: string;
}

export const headerItemsForUnauthenticatedUser: HeaderItem[] = [
  {
    title: 'Buildings',
    link: '/buildings',
  },
  {
    title: 'Apartments',
    link: '/apartments'
  },
  {
    title: 'Tenants',
    link: '/tenants'
  },
];

export const headerItemsForAuthenticatedUser: HeaderItem[] = [
  {
    title: 'Buildings',
    link: '/buildings',
  },
  {
    title: 'Apartments',
    link: '/apartments',
  },
  {
    title: 'Tenants',
    link: '/tenants',
  },
];

export const headerItemsForAdmin: HeaderItem[] = [
  {
    title: 'Buildings',
    link: '/buildings',
  },
  {
    title: 'Apartments',
    link: '/apartments',
  },
  {
    title: 'Tenants',
    link: '/tenants',
  },
  {
    title: 'Users',
    link: '/user',
  },
];                