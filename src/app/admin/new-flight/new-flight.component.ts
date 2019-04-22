import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from "@angular/router";
import { AdminService } from '../admin.service';
import { interval } from 'rxjs';
import { startWith, switchMap, single } from "rxjs/operators";
import { FlatpickrOptions } from 'ng2-flatpickr';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.scss']
})
export class NewFlightComponent implements OnInit {
  handlers: any;
  departure_time: any;
  routeId: any;
  routeDet = {
    arrivaltime: 0,
    departuretime: 0,
    fuel: 0,
    distance: 0,
    fplan: {},
  };
  exampleOptions: FlatpickrOptions = {
    enableTime: true,
    defaultDate: this.departure_time,
    mode: "single"
  };
  result: any;
  aircraft: any;
  reference_id: any;
  ops_crew: any;
  departure_airport: any;
  cargo: string;
  pax: string;
  type: string;
  dangerous: string;
  handler: any;
  arrival_airport: any;
  ops_crews: any;
  currentLoc: any;
  fromLayOver: number;
  flight_id: any;
  toLayOver: number;
  baseLoc: any;
  arrival_time: string | number | Date;
  pic_crew: any;
  fo_crew: any;
  ops_crew_name: string;
  pic_crew_name: string;
  fo_crew_name: string;
  liveLeg: any;
  positionFrom: any;
  positionTo: any;
  ops_crew_email: string;
  pic_crew_email: any;
  fo_crew_email: any;
  crewTemplate: any;
  handlerTemplate: any;
  handler_email: string;
  fromHandler: any;
  toHandler: any;
  positionFromDep: any;
  positionFromArr: any;
  positionFromDepT: any;
  positionFromArrT: any;
  positionToDep: any;
  positionToArr: any;
  positionToDepT: number;
  positionToArrT: number;
  LiveDep: any;
  LiveArr: any;
  LiveDepT: number;
  flightRoute: any
  poll: any;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any, ) { }
  aircrafts: {};
  airports: {};
  sale: {};
  id: string;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id);
    $('.delete').on('click', function () {
      $('#suggested').removeClass('is-active');
    })

    this.getAircrafts();
    this.getAirports();
    // this.sendMail();
    if (this.id !== 'new') {
      this.getSale();
    } else {
      this.sale = 'new';
      $('.ng2-flatpickr-input').addClass('input')

    }
    $('#tabs li').on('click', function () {
      var tab = $(this).data('option');

      $('#tabs li').removeClass('is-active');
      $(this).addClass('is-active');

      $('#tab-content div').removeClass('is-active');
      $('div[data-content="' + tab + '"]').addClass('is-active');
    });
    this.getCrewByOccupation()
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
  getSale(): void {
    this.adminService.getSale(this.id).subscribe(data => {
      this.sale = data.data;
      this.reference_id = data.data.reference_id;
      this.departure_time = new Date(data.data.departure);
      this.departure_airport = data.data.origin_airport;
      this.arrival_airport = data.data.destination_airport;
      console.log('sale ', this.departure_time)
      $('ng2-flatpickr').addClass('input')
    })
  }
  createMail(): void {
    console.log('sending mail')
    this.sendCrewMail(this.ops_crew.name, 'OPS', this.positionFromDep, this.positionFromArr, this.positionFromDepT)
    this.sendCrewMail(this.ops_crew.name, 'OPS', this.LiveDep, this.LiveArr, this.LiveDepT)
    this.sendCrewMail(this.ops_crew.name, 'OPS', this.positionToDep, this.positionToArr, this.positionToDepT)
    this.sendCrewMail(this.pic_crew.name, 'PIC', this.positionFromDep, this.positionFromArr, this.positionFromDepT)
    this.sendCrewMail(this.pic_crew.name, 'PIC', this.LiveDep, this.LiveArr, this.LiveDepT)
    this.sendCrewMail(this.pic_crew.name, 'PIC', this.positionToDep, this.positionToArr, this.positionToDepT)
    this.sendCrewMail(this.fo_crew.name, 'FO', this.positionFromDep, this.positionFromArr, this.positionFromDepT)
    this.sendCrewMail(this.fo_crew.name, 'FO', this.LiveDep, this.LiveArr, this.LiveDepT)
    this.sendCrewMail(this.fo_crew.name, 'FO', this.positionToDep, this.positionToArr, this.positionToDepT)
  }
  createHandlerMail(): void {
    console.log('sending handler mail')
    this.sendCrewMail(this.fromHandler.email_primary, 'Handler', this.positionFromDep, this.positionFromArr, this.positionFromDepT)
    this.sendCrewMail(this.handler.email_primary, 'Handler', this.LiveDep, this.LiveArr, this.LiveDepT)
    this.sendCrewMail(this.toHandler.email_primary, 'Handler', this.positionToDep, this.positionToArr, this.positionToDepT)
  }
  sendCrewMail(name, role, beginning, end, departTime): void {
    this.adminService.getTemplates().subscribe(data => {
      this.crewTemplate = data.data[0]
      this.handlerTemplate = data.data[1]
      var find = ["%crewname%", "%role%", "%flightID%", "%aircraftID%", "%aircraftname%", "%date%", "%time%", "%airportdeparture%", "%airportarrival%", "%link%"];
      var replace = [name, role, this.reference_id, this.aircraft.aircraftId, this.aircraft.registration, new Date(departTime * 1000).getDate() + '-' + new Date(departTime * 1000).getMonth() + '-' + new Date(departTime * 1000).getFullYear(), new Date(departTime * 1000).getHours() + ':' + new Date(departTime * 1000).getMinutes() + ':' + new Date(departTime * 1000).getSeconds(), beginning, end, this.reference_id];
      this.crewTemplate.subject = this.replaceArray(this.crewTemplate.subject, find, replace)
      this.crewTemplate.message = this.replaceArray(this.crewTemplate.message, find, replace)
      this.adminService.sendMail(this.ops_crew.p_email, this.crewTemplate.subject, this.crewTemplate.message).subscribe(data => {
        console.log('hello ', data)
      })
    })
  }
  sendHandlerMail(email, name, role, beginning, end, departTime): void {
    this.adminService.getTemplates().subscribe(data => {
      this.handlerTemplate = data.data[1]
      var find = ["%handlername%", "%role%", "%flightID%", "%aircraftID%", "%aircraftname%", "%date%", "%time%", "%airportdeparture%", "%airportarrival%", "%link%"];
      var replace = [name, role, this.reference_id, this.aircraft.aircraftId, this.aircraft.registration, new Date(departTime * 1000).getDate() + '-' + new Date(departTime * 1000).getMonth() + '-' + new Date(departTime * 1000).getFullYear(), new Date(departTime * 1000).getHours() + ':' + new Date(departTime * 1000).getMinutes() + ':' + new Date(departTime * 1000).getSeconds(), beginning, end, this.reference_id];
      this.handlerTemplate.subject = this.replaceArray(this.handlerTemplate.subject, find, replace)
      this.handlerTemplate.message = this.replaceArray(this.handlerTemplate.message, find, replace)
      this.adminService.sendMail(email, this.handlerTemplate.subject, this.handlerTemplate.message).subscribe(data => {
        console.log('hello ', data)
      })
    })
  }
  replaceArray = function (text, find, replace) {
    var replaceString = text;
    var regex;
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "g");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
  };
  getHandler(airport): void {
    this.adminService.getHandler(airport.iata_code).subscribe(data => {
      this.handlers = data.data;
      console.log('handlers ', this.handlers)
    })
  }
  paxCargo(choice): void {
    if (choice === 'pax') {
      $('#cargo').hide()
      $('#pax').show()
    } else {
      $('#pax').hide()
      $('#cargo').show()
    }
  }
  getCrewByOccupation(): void {
    this.adminService.getCrewByOccupation('OPS').subscribe(data => {
      this.ops_crews = data.data;
      console.log('crews ', this.ops_crews)
    })
  }
  addFlight(): void {
    console.log(Date.parse(this.departure_time) / 1000)
    this.adminService.getCrewByOccupation('PIC').subscribe(data => {
      console.log('crewPIC', data.data)
      data.data.some(element => {
        // console.log(Date.parse(this.departure_time) / 1000 - element.unavailable)
        var subtract = Date.parse(this.departure_time) / 1000 - element.unavailableTo;
        this.pic_crew = element._id
        this.pic_crew_name = element.name
        this.pic_crew_email = element.p_email
        return subtract >= 0

      });
      this.adminService.getCrewByOccupation('FO').subscribe(data => {
        console.log('crewFO', data.data)
        data.data.some(element => {
          // console.log(Date.parse(this.departure_time) / 1000 - element.unavailable)
          var subtract = Date.parse(this.departure_time) / 1000 - element.unavailableTo;
          this.fo_crew = element._id
          this.fo_crew_name = element.name
          this.fo_crew_email = element.p_email
          return subtract >= 0

        });
        this.adminService.getHandlerDetails(this.handler).subscribe(data => {
          this.handler_email = data.data.email_primary
          this.adminService.getCrew(this.ops_crew._id).subscribe(data => {
            this.ops_crew_name = data.data.name
            this.ops_crew_email = data.data.p_email
            console.log('checkOPS', this.ops_crew_name)
            console.log('checkFO', this.fo_crew)
            this.adminService.addFlight(
              this.reference_id,
              this.ops_crew,
              this.pic_crew,
              this.fo_crew,
              this.ops_crew_name,
              this.pic_crew_name,
              this.fo_crew_name,
              this.aircraft.aircraftId,
              this.departure_airport.iata_code,
              this.arrival_airport,
              this.departure_time,
              this.handler,
              this.dangerous,
              this.type,
              this.pax,
              this.cargo,
              this.liveLeg,
              this.positionFrom,
              this.positionTo
            ).subscribe(data => {
              console.log('resp ', data.data)
              this.flight_id = data.data._id
              console.log('flight id ', this.flight_id)
              this.adminService.updateCrew(this.pic_crew, this.departure_time, this.routeDet.arrivaltime).subscribe(data => {
                console.log('updated', data)
              })
              this.adminService.updateCrew(this.fo_crew, this.departure_time, this.routeDet.arrivaltime).subscribe(data => {
                $('#suggested').addClass('is-active')
                console.log('updated', data)
              })
            })
          })
        });

      })

    })
  }
  doRoute(): void {
    $('#addBtn').addClass('is-loading');
    $('#reset').addClass('is-hidden');
    $('#cancel').removeClass('is-hidden');
    let data = {
      aircraftid: this.aircraft.aircraftId,
      departure: this.departure_airport.iata_code,
      destination: this.arrival_airport.iata_code,
      departuretime: Date.parse(this.departure_time) / 1000
    }
    this.adminService.route(data).subscribe(data => {
      this.routeId = data.data;
      console.log('response ', this.routeId)
      this.result = this.routeId
      this.poll = interval(5000)
        .pipe(
          startWith(0),
          switchMap(() => this.adminService.longPoll(data.data))
        )
        .subscribe(res => {
          console.log(res.data)
          if (res.data.length >= 6) {
            this.poll.unsubscribe();
            this.adminService.getFplan(this.routeId).subscribe(data => {
              console.log(data)
              this.arrival_time = data.data.arrivaltime;
              this.departure_time = data.data.departuretime;
              this.routeDet.arrivaltime = data.data.arrivaltime;
              this.routeDet.departuretime = data.data.departuretime;
              this.routeDet.fuel = data.data.fuelcalc.reqdfuel;
              this.routeDet.distance = data.data.gcdist;
              this.routeDet.fplan = { ...data.data.fplan };
              console.log('rou', this.routeDet)
              this.result = JSON.stringify(this.routeDet, undefined, 2)
              // $('#addBtn').removeClass('is-loading');
              this.adminService.getCrewByOccupation('PIC').subscribe(data => {
                console.log('crewPIC', data.data)
                data.data.some(element => {
                  // console.log(Date.parse(this.departure_time) / 1000 - element.unavailable)
                  var subtract = Date.parse(this.departure_time) / 1000 - element.unavailableTo;
                  this.pic_crew = element
                  return subtract >= 0

                });
                this.adminService.getCrewByOccupation('FO').subscribe(data => {
                  console.log('crewFO', data.data)
                  data.data.some(element => {
                    // console.log(Date.parse(this.departure_time) / 1000 - element.unavailable)
                    var subtract = Date.parse(this.departure_time) / 1000 - element.unavailableTo;
                    this.fo_crew = element
                    return subtract >= 0

                  });
                  this.adminService.addRoute(this.reference_id,
                    this.routeId,
                    this.ops_crew._id,
                    this.pic_crew._id,
                    this.fo_crew._id,
                    this.ops_crew.name,
                    this.pic_crew.name,
                    this.fo_crew.name,
                    this.aircraft.aircraftId,
                    this.departure_airport.iata_code,
                    this.arrival_airport.iata_code,
                    this.handler._id,
                    this.dangerous,
                    this.type,
                    this.pax,
                    this.cargo, 'live', this.routeDet.arrivaltime, this.routeDet.departuretime, this.routeDet.fuel, this.routeDet.distance, this.routeDet.fplan).subscribe(data => {
                      $('#position-from').addClass('is-active');
                      console.log('ROUTE ADDED ', data)
                      this.LiveDep = this.departure_airport.iata_code
                      this.LiveArr = this.arrival_airport.iata_code
                      this.LiveDepT = this.routeDet.departuretime
                      this.LiveArr = this.routeDet.arrivaltime
                      this.liveLeg = data.data._id
                      this.adminService.getBriefing(this.routeId).subscribe(data => {
                        console.log('briefing', data)
                      })
                    })
                })
              });
            });
          }
          this.result = JSON.stringify(res.data, undefined, 2)
        });
    })
  }
  doPositionFrom(): void {
    $('#positionBtn').addClass('is-loading');
    $('#resetFrom').addClass('is-hidden');
    $('#cancelFrom').removeClass('is-hidden');

    var layToTime = this.fromLayOver * 60

    var arrivalTime = this.departure_time - layToTime;
    console.log(arrivalTime)
    let data = {
      aircraftid: this.aircraft.aircraftId,
      departure: this.currentLoc.iata_code,
      destination: this.departure_airport.iata_code,
      arrivaltime: arrivalTime
    }
    this.adminService.route(data).subscribe(data => {
      this.routeId = data.data;
      console.log('response ', this.routeId)
      this.result = this.routeId
      this.poll = interval(5000)
        .pipe(
          startWith(0),
          switchMap(() => this.adminService.longPoll(data.data))
        )
        .subscribe(res => {
          console.log(res.data)
          if (res.data.length >= 6) {
            this.poll.unsubscribe();
            this.adminService.getFplan(this.routeId).subscribe(data => {
              // console.log(data)
              this.routeDet.arrivaltime = data.data.arrivaltime;
              this.departure_time = data.data.departuretime;
              this.routeDet.departuretime = data.data.departuretime;
              this.routeDet.fuel = data.data.fuelcalc.reqdfuel;
              this.routeDet.distance = data.data.gcdist;
              this.routeDet.fplan = { ...data.data.fplan };
              console.log(this.routeDet)
              this.result = JSON.stringify(this.routeDet, undefined, 2)
              this.adminService.addRoute(this.reference_id,
                this.routeId,
                this.ops_crew._id,
                this.pic_crew._id,
                this.fo_crew._id,
                this.ops_crew.name,
                this.pic_crew.name,
                this.fo_crew.name,
                this.aircraft.aircraftId,
                this.currentLoc.iata_code,
                this.departure_airport.iata_code,
                this.fromHandler._id,
                this.dangerous,
                this.type,
                this.pax,
                this.cargo, 'positionFrom', this.routeDet.arrivaltime, this.routeDet.departuretime, this.routeDet.fuel, this.routeDet.distance, this.routeDet.fplan).subscribe(data => {
                  console.log('ROUTE ADDED ', data)
                  this.positionFromDep = this.currentLoc.iata_code
                  this.positionFromArr = this.departure_airport.iata_code
                  this.positionFromDepT = this.routeDet.departuretime
                  this.positionFromArrT = this.routeDet.arrivaltime
                  this.adminService.getBriefing(this.routeId).subscribe(data => {
                    console.log('briefing', data)
                  })
                  this.adminService.updateCrew(this.pic_crew._id, this.routeDet.departuretime, this.routeDet.arrivaltime).subscribe(data => {
                    console.log('updated', data)
                  })
                  this.adminService.updateCrew(this.fo_crew._id, this.routeDet.departuretime, this.routeDet.arrivaltime).subscribe(data => {
                    console.log('updated', data)
                  })
                  $('#positionBtn').removeClass('is-loading');
                  $('#position-from').removeClass('is-active');
                  $('#position-to').addClass('is-active');
                })
            });
          }
          this.result = JSON.stringify(res.data, undefined, 2)
          console.log(res.data.length)
        });
    })
  }
  doPositionTo(): void {
    $('#positionToBtn').addClass('is-loading');
    $('#resetTo').addClass('is-hidden');
    $('#cancelTo').removeClass('is-hidden');
    var layToTime = this.toLayOver * 60

    var departTime = this.departure_time + layToTime;
    console.log(departTime)
    let data = {
      aircraftid: this.aircraft.aircraftId,
      departure: this.arrival_airport.iata_code,
      destination: this.baseLoc.iata_code,
      departuretime: departTime
    }
    this.adminService.route(data).subscribe(data => {
      this.routeId = data.data;
      console.log('response ', this.routeId)
      this.result = this.routeId
      this.poll = interval(5000)
        .pipe(
          startWith(0),
          switchMap(() => this.adminService.longPoll(data.data))
        )
        .subscribe(res => {
          console.log(res.data)
          if (res.data.length >= 6) {
            this.poll.unsubscribe();
            this.adminService.getFplan(this.routeId).subscribe(data => {
              // console.log(data)
              this.routeDet.arrivaltime = data.data.arrivaltime;
              this.routeDet.departuretime = data.data.departuretime;
              this.routeDet.fuel = data.data.fuelcalc.reqdfuel;
              this.routeDet.distance = data.data.gcdist;
              this.routeDet.fplan = { ...data.data.fplan };
              console.log(this.routeDet)
              this.result = JSON.stringify(this.routeDet, undefined, 2)
              this.adminService.addRoute(this.reference_id,
                this.routeId,
                this.ops_crew._id,
                this.pic_crew._id,
                this.fo_crew._id,
                this.ops_crew.name,
                this.pic_crew.name,
                this.fo_crew.name,
                this.aircraft.aircraftId,
                this.arrival_airport.iata_code,
                this.baseLoc.iata_code,
                this.toHandler._id,
                this.dangerous,
                this.type,
                this.pax,
                this.cargo, 'positionTo', this.routeDet.arrivaltime, this.routeDet.departuretime, this.routeDet.fuel, this.routeDet.distance, this.routeDet.fplan).subscribe(data => {
                  console.log('ROUTE ADDED ', data)
                  console.log('DEPARTURE ROUTE ADDED ', this.departure_time)
                  this.positionToDep = this.arrival_airport.iata_code
                  this.positionToArr = this.baseLoc.iata_code
                  this.positionToDepT = this.routeDet.departuretime
                  this.positionToArrT = this.routeDet.arrivaltime
                  this.adminService.getBriefing(this.routeId).subscribe(data => {
                    console.log('briefing', data)
                  })
                  this.adminService.updateCrew(this.pic_crew._id, this.positionFromDepT, this.routeDet.arrivaltime).subscribe(data => {
                    console.log('updated', data)
                  })
                  this.adminService.updateCrew(this.fo_crew._id, this.positionFromDepT, this.routeDet.arrivaltime).subscribe(data => {
                    console.log('updated', data)
                  })
                  $('#suggested').addClass('is-active')
                  this.positionTo = data.data._id
                  // this.addFlight()
                })
              $('#positionToBtn').removeClass('is-loading');
              $('#position-to').removeClass('is-active');
            });
          }
          this.result = JSON.stringify(res.data, undefined, 2)
          console.log(res.data.length)
        });
    })
  }
  ngOnDestroy() {
  }
  cancel() {
    this.poll.unsubscribe()
    $('#addBtn').removeClass('is-loading');
    $('#reset').removeClass('is-hidden');
    $('#cancel').addClass('is-hidden');
  }
  cancelTo() {
    this.poll.unsubscribe()
    $('#positionToBtn').removeClass('is-loading');
    $('#resetTo').removeClass('is-hidden');
    $('#cancelTo').addClass('is-hidden');
  }
  cancelFrom() {
    this.poll.unsubscribe()
    $('#positionBtn').removeClass('is-loading');
    $('#resetFrom').removeClass('is-hidden');
    $('#cancelFrom').addClass('is-hidden');
  }
}
