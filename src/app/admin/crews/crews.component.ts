import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as $ from 'jquery';
import { AdminService } from '../admin.service';
import { FileUpload } from '../fileupload';

@Component({
  selector: 'app-crews',
  templateUrl: './crews.component.html',
  styleUrls: ['./crews.component.scss']
})
export class CrewsComponent implements OnInit {

  @Input()
  responses: Array<any>;
  password: string;
  repeatPassword: string;
  doRun: boolean;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private adminService: AdminService) {
    this.responses = [];
  }
  crews: {};
  name: string;
  img_url: string;
  occupation: string;
  p_email: string;
  s_email: string;
  p_phone: string;
  s_phone: string;
  licence: string;
  expiry: string;
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
 
    this.currentFileUpload = new FileUpload(file);
    this.adminService.pushFileToStorage(this.currentFileUpload, this.progress).subscribe(data => {
      this.img_url = data.data
      console.log('file uploaded ', this.img_url)
    })
  }
  ngOnInit() {
    this.doRun = true;

    $('#btn-add-crew').on('click', function () {
      $('#add-crew').addClass('is-active');
    })
    $('.delete').on('click', function () {
      $('#add-crew').removeClass('is-active');
    })
    this.getCrews();

   


  }
  getCrews(): void {
    this.adminService.getCrews().subscribe(data => {
      this.crews = data.data;
      console.log('crews ', this.crews)
    })
  }
  addCrew(userID): void {
    console.log('add start')
    this.adminService.addCrew(this.name, this.img_url, this.occupation, 0, 0, this.p_email, this.s_email, this.p_phone, this.s_phone, this.licence, this.expiry, userID)
      .subscribe(data => {
        console.log('Crew Added ', data)
        this.getCrews();
        this.doRun = false;
        $('form').trigger("reset");
        $('#addBtn').removeClass('is-loading');
      },
        error => {
          $('#addBtn').removeClass('is-loading');
          console.log(error)
        })
  }

  register() {

    $('#addBtn').addClass('is-loading');
    if (this.doRun === true) {
      if (this.password === this.repeatPassword) {
        this.adminService.addUser(this.name, this.p_email, this.password, this.repeatPassword, "crew", this.occupation)
          .subscribe(data => {
            console.log('new user ', data)
            this.addCrew(data.data._id);
          })
      }
    }
  }
}
