import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from 'src/app/services/auth-guard.service';
import {ListUserComponent} from './components/list-user/list-user.component';


const routes: Routes = [
   { path: '', component: ListUserComponent, canActivate: [canActivate] },
  // { path: 'edit/:id', component: EditTenantComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRouting { }
