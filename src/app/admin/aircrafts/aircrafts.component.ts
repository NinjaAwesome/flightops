import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as $ from 'jquery';
import { AdminService } from '../admin.service';
import { FileUpload } from '../fileupload';

@Component({
  selector: 'app-aircrafts',
  templateUrl: './aircrafts.component.html',
  styleUrls: ['./aircrafts.component.scss']
})
export class AircraftsComponent implements OnInit {

  @Input()
  responses: Array<any>;
  aircraftId: string;
  base: string;
  airports: any;
  doRun: boolean;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private adminService: AdminService) {
    this.responses = [];
  }

  aircrafts: {};
  registration: string;
  tow: string;
  image: string;
  fuel: string;
  pax: string;
  icao24: string;
  cargo: string;
  ngOnInit() {
    this.doRun = true;
    $('#btn-add-aircraft').on('click', function () {
      $('#add-aircraft').addClass('is-active');
    })
    $('.delete').on('click', function () {
      $('#add-aircraft').removeClass('is-active');
    })
    this.getAirports();
    this.getAircrafts();

  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
 
    this.currentFileUpload = new FileUpload(file);
    this.adminService.pushFileToStorage(this.currentFileUpload, this.progress).subscribe(data => {
      this.image = data.data
      console.log('file uploaded ', this.image)
    })
  }
  getAircrafts(): void {
    this.adminService.getAircrafts().subscribe(data => {
      this.aircrafts = data.data;
      console.log('aircrafts ', this.aircrafts)
    })
  }
  getAirports(): void {
    this.adminService.getAirports().subscribe(data => {
      this.airports = data.data;
      console.log('airports ', this.airports)
    })
  }
  addAircraft(): void {
    console.log('add start')
    $('#addBtn').addClass('is-loading');
    if (this.doRun === true) {
      this.adminService.addAircraft(this.registration, this.aircraftId, this.image, this.tow, this.fuel, this.pax, this.cargo, this.icao24, this.base)
        .subscribe(data => {
          console.log('Aircraft Added ', data)
          this.getAircrafts();
          $('form').trigger("reset");
          $('#addBtn').removeClass('is-loading');
          // $('#add-aircraft').removeClass('is-active');
          this.doRun = false
        },
          error => {
            $('#addBtn').removeClass('is-loading');
            console.log(error)
          })
    }
  }



}
