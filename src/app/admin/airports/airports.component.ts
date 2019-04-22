import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as $ from 'jquery';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent implements OnInit {

  @Input()
  responses: Array<any>;
  doRun: boolean;

  constructor(private adminService: AdminService, private router: Router) {
    this.responses = [];
  }

  airports: {};
  name: string;
  iata_code: string;
  logo: string;
  phone_primary: string;
  phone_secondary: string;
  email_primary: string;
  email_secondary: string;
  monday_open: string;
  monday_close: string;
  tuesday_open: string;
  tuesday_close: string;
  wednesday_open: string;
  wednesday_close: string;
  thursday_open: string;
  thursday_close: string;
  friday_open: string;
  friday_close: string;
  saturday_open: string;
  saturday_close: string;
  sunday_open: string;
  sunday_close: string;
  runway_1: string;
  runway_1_diagram: string;
  runway_2: string;
  runway_2_diagram: string;
  runway_3: string;
  runway_3_diagram: string;
  ngOnInit() {
        this.doRun = true;
        $('#btn-add-aircraft').on('click', function () {
      $('#add-aircraft').addClass('is-active');
    })
    $('.delete').on('click', function () {
      $('#add-aircraft').removeClass('is-active');
    })

    this.getAirports();

  }

  getAirports(): void {
    this.adminService.getAirports().subscribe(data => {
      this.airports = data.data;
      console.log('airports ', this.airports)
    })
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
