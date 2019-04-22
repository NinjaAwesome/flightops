import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AircraftsComponent } from './aircrafts/aircrafts.component';
import { AircraftComponent } from './aircraft/aircraft.component';
import { CrewsComponent } from './crews/crews.component';
import { CrewComponent } from './crew/crew.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementComponent } from './movement/movement.component';
import { SalesComponent } from './sales/sales.component';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { NewFlightComponent } from './new-flight/new-flight.component';
import { AirportsComponent } from './airports/airports.component';
import { NewAirportComponent } from './new-airport/new-airport.component';
import { HandlersComponent } from './handlers/handlers.component';
import { NewHandlerComponent } from './new-handler/new-handler.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{
  path: 'admin',
  canActivate: [OnlyAdminUsersGuard],
  children: [{
    path: '',
    component: AdminComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'aircrafts',
    component: AircraftsComponent
  },
  {
    path: 'aircraft/:id',
    component: AircraftComponent
  },
  {
    path: 'airports',
    component: AirportsComponent
  },
  {
    path: 'new-airport',
    component: NewAirportComponent
  },
  {
    path: 'handlers',
    component: HandlersComponent
  },
  {
    path: 'new-handler',
    component: NewHandlerComponent
  },
  {
    path: 'crews',
    component: CrewsComponent
  },
  {
    path: 'crew/:id',
    component: CrewComponent
  },
  {
    path: 'movements',
    component: MovementsComponent
  },
  {
    path: 'movement/:id',
    component: MovementComponent
  },
  {
    path: 'sales',
    component: SalesComponent
  },
  {
    path: 'add-sales',
    component: AddSalesComponent
  },
  {
    path: 'new-flight/:id',
    component: NewFlightComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
