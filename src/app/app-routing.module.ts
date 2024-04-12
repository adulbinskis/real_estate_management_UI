import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // TODO: lazy loading
  // TODO: angular module architecture
  // TODO: differenet route
  // optional: localization
  { path: 'buildings', loadChildren: () => import('./modules/building/building.module').then(m => m.BuildingModule) },
  { path: 'apartments', loadChildren: () => import('./modules/apartment/apartment.module').then(m => m.ApartmentModule) },
  { path: 'tenants', loadChildren: () => import('./modules/tenant/tenant.module').then(m => m.TenantModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./modules/user-management/user-management.module').then(m => m.UserManagementModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
