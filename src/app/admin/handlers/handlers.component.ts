import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as $ from 'jquery';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-handlers',
  templateUrl: './handlers.component.html',
  styleUrls: ['./handlers.component.scss']
})
export class HandlersComponent implements OnInit {

  @Input()
  responses: Array<any>;
  handlers: any;

  constructor(private adminService: AdminService) {
    this.responses = [];
  }

  ngOnInit() {

    $('#btn-add-aircraft').on('click', function () {
      $('#add-aircraft').addClass('is-active');
    })
    $('.delete').on('click', function () {
      $('#add-aircraft').removeClass('is-active');
    })

    this.getHandlers();

  }

  getHandlers(): void {
    this.adminService.getHandlers().subscribe(data => {
      this.handlers = data.data;
      console.log('handlers ', this.handlers)
    })
  }



}
