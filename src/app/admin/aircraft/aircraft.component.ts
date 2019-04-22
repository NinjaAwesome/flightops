import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CalendarEventTimesChangedEvent, CalendarEvent, CalendarView, CalendarEventAction } from 'angular-calendar';
import { isSameDay, isSameMonth, subDays, startOfDay, addDays, endOfMonth, addHours, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent implements OnInit {
  aircraft: any;
  id: string;
  aircraftLocation: any;
  aircraftLat: any;
  aircraftLon: any;
  aircraftSchedule: any;
  currentTime: number;
  status: string;

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")
    this.getAircraft();
    this.status = "On Ground";
    this.currentTime = new Date().getTime()
    $('#tabs li').on('click', function () {
      var tab = $(this).data('tab');

      $('#tabs li').removeClass('is-active');
      $(this).addClass('is-active');

      $('#tab-content div').removeClass('is-active');
      $('div[data-content="' + tab + '"]').addClass('is-active');
    });
  }
  getAircraft(): void {
    this.adminService.getAircraft(this.id).subscribe(data => {
      this.aircraft = data.data;
      this.getLocation()
      this.getAircraftSchedule()
      console.log('aircraft ', this.aircraft)
    })
  }
  getAircraftSchedule(): void {
    this.adminService.getAircraftSchedule(this.aircraft.aircraftId).subscribe(data => {
      this.aircraftSchedule = data.data;
      this.aircraftSchedule.forEach(element => {
        if(this.status === "On Ground") {
          if(element.departuretime*1000 < this.currentTime && element.arrivaltime > this.currentTime) {
            this.status = "In Progress";
          }
        }
        this.addEvent(element.departure_airport + ' -> ' + element.arrival_airport, element.departuretime, element.arrivaltime);
      });
      console.log('aircraft route', this.aircraftSchedule)
    })
  }
  getLocation(): void {
    this.adminService.getLocation(this.aircraft.icao24).subscribe(data => {
      // this.aircraft = data.data;
      this.aircraftLocation = data.data.path[data.data.path.length - 1]
      this.aircraftLat = this.aircraftLocation[1]
      this.aircraftLon = this.aircraftLocation[2]
      console.log('location ', this.aircraftLat)
    })
  }
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(title, start, end): void {
    this.events.push({
      title: title + ' (' + new Date(start * 1000) + ' - ' + new Date(end * 1000) + ')',
      start: new Date(start * 1000),
      end: new Date(end * 1000),
      color: colors.red,
      draggable: false,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
}
