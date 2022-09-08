import {SelectionModel} from '@angular/cdk/collections';
import {Component,AfterViewInit, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProgrammerDialogueComponent } from '../programmer-dialogue/programmer-dialogue.component';
import { MaintenanceDialogueComponent } from '../maintenance-dialogue/maintenance-dialogue.component';
import { MaintenanceService } from '../../services/maintenance.service';
import { Maintenances } from '../../folderModels/modelGestMaintenance/maintenance';
import { Piece } from 'src/app/folderModels/modelGestMaintenance/pieces';
import {UntypedFormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Maintenance {
  id                        :number;
  exerciceConcerne          :Number;
  vehiculeConcerne          :Number;
  motif                     :String;
  montant                   :Number;
  date_maintenance          :Date;
  reference                 :FormData;
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit,AfterViewInit  {

  /**
   * Declaration des variables à utiliser
   */

  listeMaintenance : Maintenances[] = [];

  displayedColumns: string[] = ['select','id', 'date_creation', 'motif', 'montant','reference'];
  totalCost = 125000;

  dataSource = new MatTableDataSource<Maintenances>(this.listeMaintenance);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selection = new SelectionModel<Maintenances>(true, []);
  myControl = new UntypedFormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

   constructor(
    private dialog : MatDialog,
    private serviceMaintenance :MaintenanceService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {

    // Lors du demarrage du component il faut charger les données
    this.getAllMaintenance();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  
 // @ViewChild('paginator') paginator : MatPaginator;
  pieceSelected!: Piece;
  maintenanceSelected: Maintenances;
  clickedRows = new Set<Maintenances>();

  
  /**
   * Ouverture du modal
   */
  openDialogue(){
    this.dialog.open(MaintenanceDialogueComponent,{
      width:'75%'
    });
  }

  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listeMaintenance.length;
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
  checkboxLabel(row?: Maintenances): any {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  clickedRow(row:Maintenances){
    if(this.selection.isSelected(row) ===true){
      this.clickedRows.add(row)
    }
  }

  /**
   * Cette methode ci-dessous permet de recuperer
   *  toutes les maintenances
   */
   getAllMaintenance(){
    this.serviceMaintenance.getMaintenance().subscribe(
      (dataGetted:any)=>{

        this.listeMaintenance = dataGetted.results;
        this.dataSource.data = this.listeMaintenance;
        console.log(this.listeMaintenance)

      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log("données totalement recupérés");
      }
    )
  }

  /**
   * Modification d'une maintenance
   */
   updateMaintenance():void {
    this.serviceMaintenance.sendOrDeleteMaintenance(this.maintenanceSelected,"put").subscribe(
      (dataGetted:any)=>{
        console.log(dataGetted);
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log("one maintenance have been updated  succesfully");
      }
    )
  }

  /**
   * Cette methode permet de supprimer une maintenance
   */

  deleteMaintenance():void{

    for(let data of this.selection.selected){
      this.serviceMaintenance.sendOrDeleteMaintenance(data,"delete").subscribe(
        (dataGetted:any)=>{
          console.log(dataGetted);
        },
        (error)=>{
          console.log(error);
        },
        ()=>{
          console.log("one maintenance have been deleted succesfully");
          this.getAllMaintenance();
          
        }
      )
    }
    console.log(this.selection);

  }

  /**
   * suppression d'une pièce
   */
   deletePiece(){

    this.serviceMaintenance.sendOrDeletePiece(this.pieceSelected,"delete").subscribe(
      (dataGetted:any)=>{
        console.log(dataGetted);
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log("one piece have been deleted succesfully");
      }
    )


  }

  /**
   * Modification d'une pièce
   */

  updatePiece(){
    this.serviceMaintenance.sendOrDeletePiece(this.pieceSelected,"put").subscribe(
      (dataGetted:any)=>{
        console.log(dataGetted);
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log("one piece have been deleted succesfully");
      }
    )
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
