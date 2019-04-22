import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  zuluTime: any;
  localTime: any;

  constructor() { }

  ngOnInit() {
    setInterval(() => { this.startTime(); this.startZuluTime(); }, 1000);
    this.zuluTime = new Date();
  }
  checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  startTime(): void {
    var today = new Date();
    var d = today.getDate();
    var mm = today.getMonth();
    var y = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    d = this.checkTime(d);
    mm = this.checkTime(mm);
    h = this.checkTime(h);
    m = this.checkTime(m);
    s = this.checkTime(s);
    this.localTime = d + "-" + mm + "-" + y + " " + h + ":" + m + ":" + s;
  }

  startZuluTime(): void {
    var today = new Date();
    var d = today.getUTCDate();
    var mm = today.getUTCMonth();
    var y = today.getUTCFullYear();
    var h = today.getUTCHours();
    var m = today.getUTCMinutes();
    var s = today.getUTCSeconds();
    // add a zero in front of numbers<10
    d = this.checkTime(d);
    mm = this.checkTime(mm);
    h = this.checkTime(h);
    m = this.checkTime(m);
    s = this.checkTime(s);
    this.zuluTime = d + "-" + mm + "-" + y + " " + h + ":" + m + ":" + s;
  }

}
