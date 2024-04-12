import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from 'src/app/services/auth-guard.service';
import { ListBuildingComponent } from './components/list-building/list-building.component';


const routes: Routes = [
  { path: '', component: ListBuildingComponent, canActivate: [canActivate] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingRoutingModule { }
