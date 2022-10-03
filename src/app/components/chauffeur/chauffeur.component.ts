import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChauffeurService } from '../../services/chauffeur.service';
import { Chauffeurs } from './chauffeur';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state,transition,style, animate } from '@angular/animations';
import { Vehicules } from 'src/app/folderModels/modelGestMission/vehicule';
import { VehiculeService } from '../../services/vehicule.service';


@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css'],
  animations : [
    trigger('fade',[
      state('void',style({opacity:0})),
      transition('void =>*',[
        animate(2000)
      ])
    ])
  ]
})
export class ChauffeurComponent implements OnInit {

  // declaration des variables à utiliser

  listeChauffeur : Chauffeurs[] = [];
  listeVehicule : Vehicules[] = [];


  chauffeurSelected :Chauffeurs = new Chauffeurs();
  chauffeur :Chauffeurs = new Chauffeurs();
  isLoading : boolean = true;
  dataSource = new MatTableDataSource<Chauffeurs>();
  selection = new SelectionModel<Chauffeurs>(true, []);
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  clickedRows = new Set<Chauffeurs>();

  displayedColumns: string[] = ['select', 'nom','prenom', 'vehicule','telephone', 'salaire','actions'];
  displayedColumns1: string[] = [ 'id','nom','prenom', 'vehicule','telephone', 'salaire'];
  
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  @ViewChild('dialogRefDel')
  dialogRefDel!: TemplateRef<any>;

  chauffeurFormGroup! : FormGroup;
  isPrinting : boolean = false;

  constructor(
    private chauffeurService : ChauffeurService,
    private snackBar : MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog : MatDialog,
    private vehiculeService : VehiculeService
  ) { }

  ngOnInit(): void {
    this.getAllChauffeur();
    this.getAllVehicules();

    // declaration du formulaire
    this.chauffeurFormGroup = this.formBuilder.group({
      id:this.formBuilder.control(null),
      nom:this.formBuilder.control('',Validators.required),
      prenom:this.formBuilder.control('',Validators.required),
      telephone:this.formBuilder.control('',Validators.required),
      vehicule:this.formBuilder.control('',Validators.required),
      salaire:this.formBuilder.control(100000,Validators.required)
    });
  }

  print(){
    this.isPrinting = true;
    window.print()
    this.isPrinting = false;
  }

  /** Methode de recuperation du contenu du formulaire */

  getFormData(){
    // Sur la chauffeur
    //console.log(this.chauffeurFormGroup.get('nom')?.value)
    this.chauffeur.id = this.chauffeurFormGroup.get('id')?.value;
    this.chauffeur.nom = this.chauffeurFormGroup.get('nom')?.value;
    this.chauffeur.prenom = this.chauffeurFormGroup.get('prenom')?.value;
    this.chauffeur.vehicule = this.chauffeurFormGroup.get('vehicule')?.value;
    this.chauffeur.telephone = this.chauffeurFormGroup.get('telephone')?.value;
    this.chauffeur.salaire = this.chauffeurFormGroup.get('salaire')?.value;


    //console.log(this.chauffeur);


 
  }

  setFormData(){
    // Sur la chauffeur
    //console.log(this.chauffeurFormGroup.get('nom')?.value)
    this.chauffeurFormGroup.get('id')?.setValue(this.chauffeurSelected.id );
    this.chauffeurFormGroup.get('nom')?.setValue(this.chauffeurSelected.nom );
    this.chauffeurFormGroup.get('prenom')?.setValue(this.chauffeurSelected.prenom );
    this.chauffeurFormGroup.get('vehicule')?.setValue(this.chauffeurSelected.vehicule );
    this.chauffeurFormGroup.get('telephone')?.setValue(this.chauffeurSelected.telephone );
    this.chauffeurFormGroup.get('salaire')?.setValue(this.chauffeurSelected.salaire);

  }

  get isValidchauffeurFormGroup(){
    if(
      this.chauffeurFormGroup.get('nom')?.valid &&
      this.chauffeurFormGroup.get('prenom')?.valid &&
      this.chauffeurFormGroup.get('vehicule')?.valid &&
      this.chauffeurFormGroup.get('telephone')?.valid &&
      this.chauffeurFormGroup.get('salaire')?.valid
    ){

      return true;
    }
    return false;
  }

  /**
   * Opening snacbar method
   */

   openSnackbar(message:string='operation reussie !!!',action:string){
    this.snackBar.open(message,action,{
      verticalPosition:'bottom',
      horizontalPosition:'start',
      duration:5000
    });
  }


  // methode de recuperation des donnnées chauffeurs

  getAllChauffeur(){
    this.isLoading = true;
    this.chauffeurService.getChauffeur().subscribe(
      (dataGetted:any)=>{
        this.listeChauffeur = dataGetted.results;
       // console.log(dataGetted);
        this.dataSource = new MatTableDataSource<Chauffeurs>(this.listeChauffeur);
      },
      (error)=>{
        console.log(error);
        this.isLoading = false;
      },
      ()=>{
        this.isLoading = false;
      }
    );

  }

  /**
   * Methode de recuperation de tous les vehicules
   */

   getAllVehicules(){
    this.vehiculeService.getVehicules().subscribe(
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

  // Methode de modification d'un chauffeur

  updateChauffeur(method:string='put'){
    const message = "mise à jour";
    this.dialog.closeAll();

    let action = "";
    this.isLoading = true;
    this.getFormData();
    this.chauffeurService.sendOrDeleteChauffeur(this.chauffeur,method).subscribe(
      (dataGetted:any)=>{
        //this.listeChauffeur = dataGetted.results;
        this.getAllChauffeur();
      },
      (error)=>{
        console.log(error);
        action = 'echec';
        this.isLoading = false;
      },
      ()=>{
       action ='reussie';
       this.isLoading = false;
       this.openSnackbar(message,action);
       this.chauffeurSelected=new Chauffeurs();
       this.selection.selected.pop();

      }
    );

  }

  // Methode d'ajout d'un chauffeur

  sendChauffeur(method:string='post'){
    const message = "ajout d'un nouveau chauffeur";
    let action = "";
    this.getFormData();
    this.dialog.closeAll();

    this.chauffeurService.sendOrDeleteChauffeur(this.chauffeur,method).subscribe(
      (dataGetted:any)=>{
        //this.listeChauffeur = dataGetted.results;
        this.getAllChauffeur();
        
      },
      (error)=>{
        console.log(error);
        action = 'echec';
        this.isLoading = false;
      },
      ()=>{
        action ='reussie';
        this.openSnackbar(message,action);
        this.isLoading = false;

      }
    );

  }

  /**
   * Ouverture du modal
   */
   openDialogue(){
    this.dialog.open(this.dialogRef,{
      width:'33%'
    });
  }

  /**
   * Ouverture du modal dialogRefDel
   */
   openDialogueConfirm(){
    this.dialog.open(this.dialogRefDel,{
      width:'45%'
    });
  }

  onEdit(){
    this.chauffeurSelected = this.selection.selected[0];
    console.log(this.chauffeurSelected);
    this.setFormData();
    this.openDialogue();
  }

  onDelete(){
    this.chauffeurSelected = this.selection.selected[0];
    console.log(this.chauffeurSelected);
    this.openDialogueConfirm();
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


    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.listeChauffeur.length;
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
    checkboxLabel(row?: Chauffeurs): any {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
  
    clickedRow(row:Chauffeurs){
      if(this.selection.isSelected(row) ===true){
        this.clickedRows.add(row)
      }
    }
  

}
