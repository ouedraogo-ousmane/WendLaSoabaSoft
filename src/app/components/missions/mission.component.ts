import {SelectionModel} from '@angular/cdk/collections';
import {Component,AfterViewInit, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProgrammerDialogueComponent } from '../programmer-dialogue/programmer-dialogue.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  
];



@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit  {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
 
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  matInt! : MatPaginatorIntl;
  changeDetect! : ChangeDetectorRef;
  //@ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(this.matInt,this.changeDetect,MAT_PAGINATOR_DEFAULT_OPTIONS);

  constructor(
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
  }
  

 

  ngAfterViewInit() {
  //  this.dataSource.paginator = this.paginator;
  }
  
  openDialogue(){
    this.dialog.open(ProgrammerDialogueComponent,{
      width:'65%'
    });
  }

  

 


  // @ViewChild(MatPaginator) paginator:  MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
