import {SelectionModel} from '@angular/cdk/collections';
import {Component,AfterViewInit, OnInit, ViewChild, ChangeDetectorRef, TemplateRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceService } from '../../services/maintenance.service';
import { Chauffeur, Maintenances } from '../../folderModels/modelGestMaintenance/maintenance';
import { Piece } from 'src/app/folderModels/modelGestMaintenance/pieces';
import {UntypedFormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { state, transition, trigger,style, animate } from '@angular/animations';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InfosEnregPiece } from '../../folderModels/modelGestMaintenance/infos-enreg-pieces';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { Vehicules } from 'src/app/folderModels/modelGestMission/vehicule';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  displayedColumns1: string[] = [ 'id','motif', 'chauffeur','date_maintenance', 'montant'];
  // displayedColumns: string[] = ['select','id','date_maintenance', 'chauffeur', 'motif', 'montant','reference'];
  totalCost = 125000;
  dataSource = new MatTableDataSource<Maintenances>();
  selection = new SelectionModel<Maintenances>(true, []);
  myControl = new UntypedFormControl('');
  options: string[] = ['date_maintenance', 'motif', 'chauffeur'];
  filteredOptions: Observable<string[]>;

  exercice_id! : number;
  IsWait : boolean = true;
  pieceSelected!: Piece;
  maintenanceSelected: Maintenances;
  clickedRows = new Set<Maintenances>();
  maintenance :Maintenances = new Maintenances();
  piece : Piece = new Piece();
  infosEnreg : InfosEnregPiece = new InfosEnregPiece();
  listePieceAjoutee :number[] = [];  
  pieceAdded : number = 0;
  maintenanceAdded : number = 0;
  listeVehicule : Vehicules[] = [];
  listePiece : Piece[] = [];
  listePieceGetted : Piece[] = [];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

   constructor(
    private dialog : MatDialog,
    private serviceMaintenance :MaintenanceService,
    private cdr: ChangeDetectorRef,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar : MatSnackBar,
    private dialogue : MatDialog,
    private serviceVehicule : VehiculeService
  ) { }


  ngOnInit(): void {
    this.exercice_id = this.getId_exercice();

    // Lors du demarrage du component il faut charger les données
    this.getAllMaintenance();
    this.getAllPieces();
    this.getAllVehicules();

    // declaration du formulaire
    this.firstFormGroup = this.formBuilder.group({
      dateEntree:this.formBuilder.control(''),
      vehicule:this.formBuilder.control('',Validators.required),
      motif:this.formBuilder.control('',Validators.required),
      coutMaint:this.formBuilder.control('',Validators.required),
      reference:this.formBuilder.control(null)
    });
    this.secondFormGroup = this.formBuilder.group({
      piece:this.formBuilder.control('',Validators.required),
      prix:this.formBuilder.control(''),
      dureeDevie:this.formBuilder.control(''),
      quantite:this.formBuilder.control('')
    });
  
    
  }

  print(){
    this.isPrinting = true;
    window.print()
    this.isPrinting = false;
  }
  @ViewChild(MatPaginator,{static:true}) paginator :MatPaginator;
  // set paginator(value: MatPaginator) {
  //   if (this.dataSource){
  //     this.dataSource.paginator = value;
  //   }
  // }


  ngAfterViewInit() {
    //this.dataSource = new MatTableDataSource<Maintenances>(this.listeMaintenance);
    setTimeout(() => this.dataSource.paginator = this.paginator);
   // this.dataSource.paginator = this.paginator;
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
    this.dialog.open(this.dialogRef,{
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
      async(dataGetted:any)=>{

       // console.log(dataGetted);

        this.listeMaintenance = dataGetted.results;
        this.listeMaintenance = this.filterDataByExercice(this.exercice_id);
        this.dataSource  = await new MatTableDataSource(this.listeMaintenance);
        this.dataSource.paginator = this.paginator;

      },
      (error)=>{
        this.IsWait = false;
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
        //console.log(dataGetted);
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
         // console.log(dataGetted);
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
   // console.log(this.selection);

  }

  /**
   * suppression d'une pièce
   */
   deletePiece(){

    this.serviceMaintenance.sendOrDeletePiece(this.pieceSelected,"delete").subscribe(
      (dataGetted:any)=>{
      //  console.log(dataGetted);
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
       // console.log(dataGetted);
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
   * Opening snacbar method
   */

   openSnackbar(action:string){
    this.snackBar.open('operation reussie !!!',action,{
      verticalPosition:'bottom',
      horizontalPosition:'start',
      duration:5000
    });
  }

/**
 * Validation du formulaire
 */

  get isValid() {

    if(this.firstFormGroup.get('vehicule')?.valid &&
      this.firstFormGroup.get('coutMaint')?.valid &&
      this.firstFormGroup.get('dateEntree')?.valid){
      return true
    } 
    return false;
    
  }

  get isValidSecondForm() {

    if(this.secondFormGroup.get('piece')?.valid){
      return true
    }
    return false;
    
  }


  /** Methode de recuperation du contenu du formulaire */

  getFormData(){
    // Sur la maintenance
    // this.maintenance.id = this.firstFormGroup.get('id_maint')?.value;
    console.log(this.firstFormGroup.get('coutMaint')?.value)
    this.maintenance.montant = this.firstFormGroup.get('coutMaint')?.value;
    this.maintenance.date_maintenance = new Date(this.firstFormGroup.get('dateEntree')?.value);
    this.maintenance.motif = this.firstFormGroup.get('motif')?.value;
    this.maintenance.exerciceConcerne = this.exercice_id;
    this.maintenance.vehiculeConcerne = this.firstFormGroup.get('vehicule')?.value;


    console.log(this.maintenance);


    // Sur la piece
    //this.piece.id = this.secondFormGroup.get('id_piece')?.value;
    this.piece.id = this.secondFormGroup.get('piece')?.value;
   // this.piece.dvie_piece = this.secondFormGroup.get('dureeDevie')?.value;

    // Les infos supplementaires
    this.infosEnreg.maintenanceConcernee = this.firstFormGroup.get('id_maint')?.value;
    this.infosEnreg.nomPiece = this.secondFormGroup.get('id_piece')?.value;
    this.infosEnreg.coutUnitaire     = this.secondFormGroup.get('prix')?.value;
    this.infosEnreg.nombre = this.secondFormGroup.get('quantite')?.value;
  }

 

  
  /**
   * Methode permettant d'enregistrer une maintenance
   */
  saveMaintenance(): void{
    this.getFormData();
    
    this.serviceMaintenance.sendOrDeleteMaintenance(this.maintenance,"post").subscribe(
      (value:any)=>{
        this.maintenanceAdded = value.id;
        this.maintenance.id =  this.maintenanceAdded;
        this.getAllMaintenance();

        console.log(value);
        
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log("une operation d'envoie a été effectué");
        
        
      }
    )
  }

  

  /**
   * Definition des methodes sur la gestion des pièces
   */

  /**
   * Enregistrement d'une pièce
   */
  savePiece(){

    this.getFormData();
    this.infosEnreg.maintenanceConcernee = this.maintenanceAdded;
    
    this.infosEnreg.nomPiece = this.piece.id;
    this.serviceMaintenance.sendOrDeleteInfosEnregistrement(this.infosEnreg,"post").subscribe(
      (value:any)=>{
        console.log(value);
        this.pieceAdded = this.piece.id;
        
        
      }
    )
    console.log(this.piece)
    // this.serviceMaintenance.sendOrDeletePiece(this.piece,"post").subscribe(
    //   (value:any)=>{
        
    //   }
    // )

  }

  getTotal(){
    let somme =0;
    for(let data of this.dataSource.data){
      somme += Number(data.montant);

    }
    return somme;
  }
  

  /**
   * Cette methode ci-dessous permet tout simplement de terminer la procedure d'enregistrement
   */

  endSaving(){
    this.getAllMaintenance();
    this.dialogue.closeAll();
    this.openSnackbar('ajout !');
  }

  /**
   * Methode de recuperation de tous les vehicules
   */

  getAllVehicules(){
    this.serviceVehicule.getVehicules().subscribe(
      (dataGetted:any)=>{
        this.listeVehicule = dataGetted.results;
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log("Données recupérées avec succès")
      }
    )
  }

   /**
   * Methode de recuperation de toutes les pièces
   */

    getAllPieces(){
      this.serviceMaintenance.getPieces().subscribe(
        (dataGetted:any)=>{
          this.listePiece = dataGetted.results;
          //console.log(this.listePiece);
        },
        (error)=>{
          console.log("Erreur détecté lors de la recuperation");
        },
        ()=>{
          console.log("Données recupérées avec succès")
        }
      )
    }

    getFormPiece(){
      this.getFormData();
      this.listePieceGetted.push(this.piece);
      this.secondFormGroup.reset();
      //console.log(this.listePieceGetted);
    }

}
