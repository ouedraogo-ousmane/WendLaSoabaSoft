import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-bilan-missions',
  templateUrl: './bilan-missions.component.html',
  styleUrls: ['./bilan-missions.component.css']
})
export class BilanMissionsComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(NotificationsComponent,  {
      width: '55%',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(`Dialog result: ${result}`);
      
    });
  }
}
