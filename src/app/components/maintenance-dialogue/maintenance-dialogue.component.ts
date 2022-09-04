import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Piece } from 'src/app/folderModels/modelGestMaintenance/pieces';
import { Maintenances } from '../../folderModels/modelGestMaintenance/maintenance';
import { InfosEnregPiece } from '../../folderModels/modelGestMaintenance/infos-enreg-pieces';
import { MaintenanceService } from '../../services/maintenance.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-maintenance-dialogue',
  templateUrl: './maintenance-dialogue.component.html',
  styleUrls: ['./maintenance-dialogue.component.css']
})
export class MaintenanceDialogueComponent implements OnInit {

  /**
   * Declaration des variables à utiliser
   */
  maintenance :Maintenances = new Maintenances();
  piece : Piece = new Piece();
  infosEnreg : InfosEnregPiece = new InfosEnregPiece();
  listePieceAjoutee :number[] = [];
  pieceAdded! : number;
  maintenanceAdded! : number;


  constructor(private formBuilder: FormBuilder,
              private dialogue : MatDialog,
              private serviceMaintenance : MaintenanceService) {}
  firstFormGroup: FormGroup = this.formBuilder.group({
    id_maint:this.formBuilder.control(null),
    dateEntree:this.formBuilder.control('',Validators.required),
    vehicule:this.formBuilder.control('',Validators.required),
    motif:this.formBuilder.control('',Validators.required),
    coutMaint:this.formBuilder.control('',Validators.required),
    reference:this.formBuilder.control(null)
});
  secondFormGroup: FormGroup = this.formBuilder.group({
    id_piece:this.formBuilder.control(null),
    piece:this.formBuilder.control(''),
    prix:this.formBuilder.control(''),
    dureeDevie:this.formBuilder.control(''),
    quantite:this.formBuilder.control('')
  });

  ngOnInit(): void {

  }

  

  /** Methode de recuperation du contenu du formulaire */

  getFormData(){
    // Sur la maintenance
    this.maintenance.id_maint = this.firstFormGroup.get('id_maint')?.value;
    this.maintenance.id_vehicule = this.firstFormGroup.get('vehicule')?.value;
    this.maintenance.cout_maint = this.firstFormGroup.get('coutMaint')?.value;
    this.maintenance.dateEntree = this.firstFormGroup.get('dateEntree')?.value;
    this.maintenance.motif_maint = this.firstFormGroup.get('motif')?.value;

    // Sur la piece
    this.piece.id_piece = this.secondFormGroup.get('id_piece')?.value;
    this.piece.nom_piece = this.secondFormGroup.get('piece')?.value;
    this.piece.dvie_piece = this.secondFormGroup.get('dureeDevie')?.value;

    // Les infos supplementaires

    this.infosEnreg.id_maint = this.firstFormGroup.get('id_maint')?.value;
    this.infosEnreg.id_piece = this.secondFormGroup.get('id_piece')?.value;
    this.infosEnreg.prix     = this.secondFormGroup.get('prix')?.value;
    this.infosEnreg.quantite = this.secondFormGroup.get('quantite')?.value;
  }

  // Methode permettant d'enregistrer une maintenance

  saveMaintenance(): void{
    this.getFormData();
    this.serviceMaintenance.sendOrDeleteMaintenance(this.maintenance,"post").subscribe(
      (value:any)=>{
        this.maintenanceAdded = value.data.insertId;
      }
    )
  }

  /**
   * Cette methode ci-dessous permet d'enregistrer une pièce
   */

  savePiece(){

    this.getFormData();
    this.infosEnreg.id_maint = this.maintenanceAdded;
    this.serviceMaintenance.sendOrDeletePiece(this.piece,"post").subscribe(
      (value:any)=>{
        this.pieceAdded = value.data.insertId;
        this.infosEnreg.id_piece = this.pieceAdded;
        this.serviceMaintenance.sendOrDeleteInfosEnregistrement(this.infosEnreg,"post").subscribe(
          ()=>{
            console.log("donnée envoyés avec succès");
            
          }
        )
      }
    )

  }

  /**
   * Cette methode ci-dessous permet tout simplement de terminer la procedure d'enregistrement
   */

  endSaving(){
    this.dialogue.closeAll();
  }



}
