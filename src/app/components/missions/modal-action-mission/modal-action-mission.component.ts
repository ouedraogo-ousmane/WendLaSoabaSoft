import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-action-mission',
  templateUrl: './modal-action-mission.component.html',
  styleUrls: ['./modal-action-mission.component.css']
})
export class ModalActionMissionComponent {
  choix!:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public delORend: string,
    private dialogRef: MatDialogRef<ModalActionMissionComponent>
  ) {
    this.choix = this.delORend

  }




}


