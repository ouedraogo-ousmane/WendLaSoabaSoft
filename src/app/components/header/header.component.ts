import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsComponent } from '../missions/notifications/notifications.component';
import { SnotificationsService } from '../missions/notifications/snotifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  hidden = false;

  nombreNotification : number = 0;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(public dialog: MatDialog,private notificationService:SnotificationsService) {}
  ngOnInit(): void {
    this.getListeDocsVehicule();
  }

  openDialog() {
    const dialogRef = this.dialog.open(NotificationsComponent,  {
      width: '55%',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(`Dialog result: ${result}`);
      
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  getListeDocsVehicule(){
    this.notificationService.getDocsVehicule().subscribe(
      (data)=>{
        this.nombreNotification = data.results.length;
        
      },
      (error)=>{
        console.log(error)
      },

      ()=>{
       
      }
    )
  }



 


  

}
