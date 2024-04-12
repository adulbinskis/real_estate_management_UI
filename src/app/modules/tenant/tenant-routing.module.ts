import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from 'src/app/services/auth-guard.service';
import { ListTenantsComponent } from './components/list-tenant/list-tenant.component';


const routes: Routes = [
  { path: ':id', component: ListTenantsComponent , canActivate: [canActivate]},
  { path: '', component: ListTenantsComponent , canActivate: [canActivate]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
