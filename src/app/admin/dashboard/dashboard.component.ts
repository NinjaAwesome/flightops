import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import * as io from "socket.io-client";
import { AdminService } from '../admin.service';
import * as $ from 'jquery';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  private userSubscription: Subscription;
  public user: any;
  schedule: any;
  id: any;
  crew_id: any;
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {
    if (!this.authService.loggedIn()) this.navigate('/auth/login');
  }

  public ngOnInit() {
    // init this.user on startup
    this.authService.me().subscribe(user => {
      this.user = user.user;
      this.id = this.user._id
      console.log('user ', this.user)
      if (this.user.role === "admin") {
        this.getAdminSchedule()
      } else {
        this.adminService.getCrewByUser(this.id).subscribe(data => {
          console.log(data.data)
          if (data.data[0]) {
            this.crew_id = data.data[0]._id
            console.log('crew_id ', this.crew_id)
            if (this.user.occupation === "PIC") this.getPICSchedule()
            if (this.user.occupation === "OPS") this.getOPSSchedule()
            if (this.user.occupation === "FO") this.getFOSchedule()
          }
        })
      }
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user) => {
      this.user = user;
    });
  }
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  navigate(link): void {
    this.router.navigate([link]);
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
  getAdminSchedule(): void {
    this.adminService.getAdminSchedule().subscribe(data => {
      this.schedule = data.data;
      this.schedule.forEach(element => {
        this.addEvent(element.departure_airport + ' ->' + element.arrival_airport, element.departuretime, element.arrivaltime);
      });
      console.log('schedule ', this.schedule)
    })
  }
  getFOSchedule(): void {
    this.adminService.getFOSchedule(this.crew_id).subscribe(data => {
      this.schedule = data.data;
      this.schedule.forEach(element => {
        this.addEvent(element.departure_airport + ' ->' + element.arrival_airport, element.departuretime, element.arrivaltime);
      });
      console.log('schedule ', this.schedule)
    })
  }
  getOPSSchedule(): void {
    this.adminService.getOPSSchedule(this.crew_id).subscribe(data => {
      this.schedule = data.data;
      this.schedule.forEach(element => {
        this.addEvent(element.departure_airport + ' -> ' + element.arrival_airport, element.departuretime, element.arrivaltime);
      });
      console.log('schedule ', this.schedule)
    })
  }
  getPICSchedule(): void {
    this.adminService.getPICSchedule(this.crew_id).subscribe(data => {
      this.schedule = data.data;
      this.schedule.forEach(element => {
        this.addEvent(element.departure_airport + ' -> ' + element.arrival_airport, element.departuretime, element.arrivaltime);
      });
      console.log('schedule ', this.schedule)
    })
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


  logout() {
    this.authService.signOut();
    this.navigate('/auth/login');
  }


}
