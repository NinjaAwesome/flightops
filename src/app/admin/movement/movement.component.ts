import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {
  departureNOTAM: any;
  arrivalNOTAM: any;
  movement: any;
  ops: any;
  fo: any;
  pic: any;
  departLon: any;
  departLat: any;
  arriveLat: any;
  arriveLon: any;
  viewLat: any;
  viewLon: any;
  currentTime: number;

  constructor(private route: ActivatedRoute, private adminService: AdminService) { }
  id: string;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")
    this.currentTime = new Date().getTime()
    this.getMovement()
  }

  getMovement(): void {
    this.adminService.getMovement(this.id).subscribe(data => {
      this.movement = data.data;
      this.getDepartureNOTAM(this.movement.departure_airport)
      this.getArrivalNOTAM(this.movement.arrival_airport)
      this.getPIC()
      this.getFO()
      this.getOPS()
      this.getDepartAirport()
      this.getArriveAirport()
      console.log('movement ', this.movement)
    })
  }
  getDepartAirport(): void {
    this.adminService.getAirport(this.movement.departure_airport).subscribe(data => {
      console.log('paaic ', data.data)
      this.departLat = data.data[0].latitude
      this.departLon = data.data[0].longitude
    })
  }
  getArriveAirport(): void {
    this.adminService.getAirport(this.movement.arrival_airport).subscribe(data => {
      this.arriveLat = data.data[0].latitude
      this.arriveLon = data.data[0].longitude
      console.log('paaic ', this.arriveLat)
      if (this.arriveLat && this.departLat) {
        this.viewLat = (this.departLat + this.arriveLat) / 2
        this.viewLon = (this.departLon + this.arriveLon) / 2
        console.log('paaic ', this.viewLat)
        console.log('paaic ', this.viewLon)
      }
    })
  }
  getPIC(): void {
    this.adminService.getCrew(this.movement.pic_crew).subscribe(data => {
      this.pic = data.data;
      console.log('pic ', this.pic)
    })
  }
  getFO(): void {
    this.adminService.getCrew(this.movement.fo_crew).subscribe(data => {
      this.fo = data.data;
      console.log('fo ', this.fo)
    })
  }
  getOPS(): void {
    this.adminService.getCrew(this.movement.ops_crew).subscribe(data => {
      this.ops = data.data;
      console.log('ops ', this.ops)
    })
  }
  getDepartureNOTAM(id): void {
    this.adminService.getNOTAM(id).subscribe(data => {
      this.departureNOTAM = data.data.rows;
      console.log('departureNOTAM ', this.departureNOTAM)
    })
  }
  getArrivalNOTAM(id): void {
    this.adminService.getNOTAM(id).subscribe(data => {
      this.arrivalNOTAM = data.data.rows;
      console.log('arrivalNOTAM ', this.arrivalNOTAM)
    })
  }

}
