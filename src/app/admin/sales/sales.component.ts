import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  sales: {};
  ngOnInit() {
    this.getSales();
  }
  getSales(): void {
    this.adminService.getSales().subscribe(data => {
      this.sales = data.data;
      console.log('crews ', this.sales)
    })
  }

}
