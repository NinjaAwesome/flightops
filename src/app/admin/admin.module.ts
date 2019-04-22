import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {OnlyAdminUsersGuard} from './admin-user-guard';
import { HeaderComponent } from './header/header.component';
import { AngularOpenlayersModule } from "ngx-openlayers";
import { SideNavComponent } from './side-nav/side-nav.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AircraftsComponent } from './aircrafts/aircrafts.component';
import { AirportsComponent } from './airports/airports.component';
import { AircraftComponent } from './aircraft/aircraft.component';
import { CrewsComponent } from './crews/crews.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FileUploadModule } from "ng2-file-upload";
import { CrewComponent } from './crew/crew.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MovementsComponent } from './movements/movements.component';
import { MovementComponent } from './movement/movement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SalesComponent } from './sales/sales.component';
import { environment } from '../../environments/environment';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { NewFlightComponent } from './new-flight/new-flight.component';
import { NewAirportComponent } from './new-airport/new-airport.component';
import { HandlersComponent } from './handlers/handlers.component';
import { NewHandlerComponent } from './new-handler/new-handler.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AdminComponent,
    SideNavComponent,
    ChatComponent,
    DashboardComponent,
    AircraftsComponent,
    AirportsComponent,
    AircraftComponent,
    CrewsComponent,
    CrewComponent,
    MovementsComponent,
    MovementComponent,
    SalesComponent,
    AddSalesComponent,
    NewFlightComponent,
    NewAirportComponent,
    HandlersComponent,
    NewHandlerComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FileUploadModule,
    Ng2FlatpickrModule,
    AngularOpenlayersModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    FlatpickrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {}
