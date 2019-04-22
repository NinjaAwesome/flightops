import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-new-handler',
  templateUrl: './new-handler.component.html',
  styleUrls: ['./new-handler.component.scss']
})
export class NewHandlerComponent implements OnInit {
  doRun: boolean;

  constructor(private adminService: AdminService) {}

  airports: any;
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
  ngOnInit() {
    this.doRun = true;
    this.getAirports();
  }
  addHandler(): void {
    console.log('add start')
    $('#addBtn').addClass('is-loading');
    if (this.doRun === true) {
      this.adminService.addHandler(this.name, this.iata_code, this.logo, this.phone_primary, this.phone_secondary, this.email_primary, this.email_secondary, this.monday_open, this.monday_close, this.tuesday_open, this.tuesday_close, this.wednesday_open, this.wednesday_close, this.thursday_open, this.thursday_close, this.friday_open, this.friday_close, this.saturday_open, this.saturday_close, this.sunday_open, this.sunday_close)
      .subscribe(data => {
        console.log('Aircraft Added ', data)
        $('form').trigger("reset");
        $('#addBtn').removeClass('is-loading');
        this.doRun = false;
      },
        error => {
          $('#addBtn').removeClass('is-loading');
          console.log(error)
        })
  }
}
  getAirports(): void {
    this.adminService.getAirports().subscribe(data => {
      this.airports = data.data;
      console.log('airports ', this.airports)
    })
  }

}
