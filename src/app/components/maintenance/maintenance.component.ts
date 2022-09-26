import {SelectionModel} from '@angular/cdk/collections';
import {Component,AfterViewInit, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceDialogueComponent } from '../maintenance-dialogue/maintenance-dialogue.component';
import { MaintenanceService } from '../../services/maintenance.service';
import { Chauffeur, Maintenances } from '../../folderModels/modelGestMaintenance/maintenance';
import { Piece } from 'src/app/folderModels/modelGestMaintenance/pieces';
import {UntypedFormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { state, transition, trigger,style, animate } from '@angular/animations';


export interface Maintenance {
  id                        :number;
  exerciceConcerne          :Number;
  vehiculeConcerne          :Number;
  motif                     :String;
  montant                   :Number;
  date_maintenance          :Date;
  chauffeur                 :String;
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
  animations : [
    trigger('fade',[
      state('void',style({opacity:0})),
      transition('void =>*',[
        animate(2000)
      ])
    ])
  ]
})
export class MaintenanceComponent implements OnInit,AfterViewInit  {

  /**
   * Declaration des variables à utiliser
   */

  listeMaintenance : Maintenances[] = [];
  chauffeur! : Chauffeur;
  event! :Event;
  isPrinting : boolean = false;

  displayedColumns: string[] = ['select', 'motif', 'chauffeur','date_maintenance', 'montant'];
  // displayedColumns: string[] = ['select','id','date_maintenance', 'chauffeur', 'motif', 'montant','reference'];
  totalCost = 125000;
  dataSource! : MatTableDataSource<Maintenances>
  selection = new SelectionModel<Maintenances>(true, []);
  myControl = new UntypedFormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  exercice_id! : number;
  IsWait : boolean = true;
  pieceSelected!: Piece;
  maintenanceSelected: Maintenances;
  clickedRows = new Set<Maintenances>();

   constructor(
    private dialog : MatDialog,
    private serviceMaintenance :MaintenanceService,
    private cdr: ChangeDetectorRef,
    private route : ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.exercice_id = this.getId_exercice();

    // Lors du demarrage du component il faut charger les données
    this.getAllMaintenance();
    
  }

  print(){
    this.isPrinting = true;
  }
  @ViewChild('paginator') paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Maintenances>(this.listeMaintenance);
    this.dataSource.paginator = this.paginator;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   * Cette methode ci-dessous permet de filtrer les données du tableau
   */
  applyFiltrer(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
    
  }


  filterDataByExercice(id:number){

    let dataFiltered = []

    for(let data of this.listeMaintenance){

      if(data.exerciceConcerne ==id){
        dataFiltered.push(data);
      }

    }

  //  console.log(dataFiltered);
    
    
    return dataFiltered
  }
  
  
  /**
   * Ouverture du modal
   */
  openDialogue(){
    this.dialog.open(MaintenanceDialogueComponent,{
      width:'40%',
      data : {id_exercice : this.exercice_id}
    });
  }

  

/**
 * Cette methode permet de recuperer de l'exercice concerné par la maintenance
 */

  getId_exercice():number{
    
    let queryParam:any;

       this.route.queryParamMap  //Recuperation des parametres state d'url : ActivatedRoute
      .subscribe((params) => {
         queryParam = {...params }; // operateur de diffussion

       });
       return queryParam.params.exercice
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
    this.IsWait = true;
    this.serviceMaintenance.getMaintenance().subscribe(
      (dataGetted:any)=>{

        console.log(dataGetted);

        this.listeMaintenance = dataGetted.results;
        this.listeMaintenance = this.filterDataByExercice(this.exercice_id);
        this.dataSource.data = this.listeMaintenance;

      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        
        console.log("données totalement recupérés");
        this.IsWait = false;
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
