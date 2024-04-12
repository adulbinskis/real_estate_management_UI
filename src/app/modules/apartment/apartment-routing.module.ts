import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListApartmentComponent } from './components/list-apartment/list-apartment.component';
import { canActivate } from 'src/app/services/auth-guard.service';


const routes: Routes = [
  { path: ':id', component: ListApartmentComponent , canActivate: [canActivate]},
  { path: '', component: ListApartmentComponent , canActivate: [canActivate]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule { }
