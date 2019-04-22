import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { AdminService } from '../admin.service';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/platform-browser';
import { FlatpickrOptions } from 'ng2-flatpickr';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})
export class AddSalesComponent implements OnInit {
  airports: any;

  exampleOptions: FlatpickrOptions = {
    enableTime: true,
    mode: "single"
  };
  reference_id: string;
  doRun: boolean;
  constructor(private adminService: AdminService, private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any) { }

  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  weight: string;
  dangerous: string;
  description: string;
  instructions: string;
  origin_airport: string;
  destination_airport: string;
  departure: string;
  estimated_cost: string;
  price_charged: string;
  ngOnInit() {
    this.getAirports();
    this.doRun = true
  }

  ngAfterViewInit() {
    // addClass hack until ng2-flatpickr takes my PR
    this.renderer.addClass(this.document.getElementsByClassName('ng2-flatpickr-input flatpickr-input')[0], 'input');
  }
  getAirports(): void {
    this.adminService.getAirports().subscribe(data => {
      this.airports = data.data;
      console.log('airports ', this.airports)
    })
  }
  addSale(): void {
    console.log('add start')
    $('#addBtn').addClass('is-loading');
    if (this.doRun === true) {
      this.adminService.addSale(this.company_name, this.contact_name, this.contact_email, this.contact_phone, this.weight, this.dangerous, this.instructions, this.description, this.origin_airport, this.destination_airport, Date.parse(this.departure) / 1000, this.reference_id, this.estimated_cost, this.price_charged)
        .subscribe(data => {
          console.log('Aircraft Added ', data)
          // this.getAircrafts();
          $('form').trigger("reset");
          $('#addBtn').removeClass('is-loading');
          this.doRun = false
        },
          error => {
            $('#addBtn').removeClass('is-loading');
            console.log(error)
          })
    }
  }

}
