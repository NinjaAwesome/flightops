import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  movements: any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getFlight()
  }
  getFlight(): void {
    this.adminService.getMovements().subscribe(data => {
      this.movements = data.data;
      console.log('movements ', this.movements)
    })
  }
  download(id): void {
    console.log(id)

    this.adminService.downloadBriefing(id).subscribe()
  }

}
