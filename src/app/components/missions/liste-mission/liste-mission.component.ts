import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AcceuilMissionList } from '../Imission';
import { IlisteMission, MissionService } from '../mission.service';
import { ModalActionMissionComponent } from '../modal-action-mission/modal-action-mission.component';

@Component({
  selector: 'app-liste-mission',
  templateUrl: './liste-mission.component.html',
  styleUrls: ['./liste-mission.component.css']
})
export class ListeMissionComponent implements OnInit {

  @Output() isdetail: boolean = false;

  @Output()
  mission_selected: EventEmitter<AcceuilMissionList> = new EventEmitter();

  @Output()
  mission_to_be_print:EventEmitter<AcceuilMissionList> = new EventEmitter();

  @Output()
  go_menu_acceil:EventEmitter<string> = new EventEmitter();

  sub:Subscription = new Subscription();
  isWait : boolean = true;
  exercice_id:number = -1; // exercice parent à la mission

  //ajout
 typesOfShoes: string[] = ['ouedradrogo Amado', 'Karim Is', 'Ms  salif', 'Moccasins', 'Sneakers'];

 menuMission:any[]=[
     {nom:'Acceuil', ulrs:'acceuil'},
     {nom:'Nouvelle mission', urls:'programmer'},
     {nom:'Bilan', urls:'bilan'},
 ];

 endPointGlobal:string = '';
 navigationSelected = new FormControl('');
  fontStyle?: string;

 constructor
 (
            private route : ActivatedRoute,
            private router: Router,
            private serviceMission:MissionService,
            private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.exercice_parent();
  }

  choiceMission(missionSelected:any){
    console.log(missionSelected)
  }
  // recuperation de l'exercice choisi

  exercice_parent():void{
    // methode permettant de retourner l'exercice parent d'une mission

    let queryParam:any;

       this.route.queryParamMap  //Recuperation des parametres state d'url : ActivatedRoute
      .subscribe((params) => {
         queryParam = {...params }; // operateur de diffussion

       });
       this.exercice_id = queryParam.params.exercice
       //recuperer la liste des missions qui lui sont relative
       const endpointListeMission = "http://127.0.0.1:8000/missions/acceuil/?exercice="+this.exercice_id
       this.endPointGlobal = endpointListeMission
       this.getListeMissionAcceuil(endpointListeMission);
  }

  // SECTION GET -->Liste des missions : {id, chauffeur{nom, prenom, etat_mission}}
  listeMissionTerminee:AcceuilMissionList[]=[];
  listeMissionEnCours:AcceuilMissionList[]=[];
  listeMission:AcceuilMissionList[] = [];
  pageMissionSuivant:string= ''; // contenir l'url des pages suivant
  pageMissionPrecedent:string=''; // contenir l'url des pages precedents

  getListeMissionAcceuil(endpointListeMission:string){
    /* recuperqtion de la liste des missions */

      let settingDePagination:IlisteMission; // variable local pour la configuration de pagination

      this.sub = this.serviceMission.getListeMission(endpointListeMission)
      .subscribe(
        (data:IlisteMission)=>{
          this.listeMission = data.results;
          //console.log(this.listeMission)
           settingDePagination = data // stockage du resultat pour l'extration des params: next et previous
           // impossible de les affectés directement au var de pagination
        },
        (error:any)=>{
          console.log(error)
        },
        ()=>{

            this.filterMissionStatus(); // fonction de filtrage en fontion du status des missions

            // definition des parametres de pagination
            if(settingDePagination.next==null) this.pageMissionSuivant = ' '; // important pour eviter les urls null
            else this.pageMissionSuivant = settingDePagination.next;

            if(settingDePagination.previous ==null) this.pageMissionPrecedent =' '; // important pour eviter les urls null
            else this.pageMissionPrecedent=settingDePagination.previous;

            this.isWait = false;
        }
      )

  }

  listerMissionParStatus(statusCh:any){
    // bouton de filtrage de mission en fonction du status : changement du contenu du tableau
    // listeMission en fonction du cas
     if(statusCh==false) {this.listeMission = this.listeMissionTerminee;}
     else this.listeMission = this.listeMissionEnCours
  }

// filtrage par status de mission
  filterMissionStatus(){
    /* fonction de triage des missions en fonction de leur etat */
    if(this.listeMission.length!=0){
      this.listeMissionTerminee = this.listeMission.filter((obj)=>{
        return obj.etat_mission == true
      });

      this.listeMissionEnCours =  this.listeMission.filter((obj)=>{
        return obj.etat_mission == false
      });
    }

    // par defaut la liste des mission en cours
  }

// methode GET de pagination
  getMissionListPagination(is_pageSuivant:boolean){
    /**
     * Ecoute la direction choisie si l'url n'est pas null
     * alors GET
     */
    switch(is_pageSuivant){
      case true:
        if(this.pageMissionSuivant != ' ')
        {
          // probleme : le filtrage doit etre fait en fonction du choix de l'etat
           this.getListeMissionAcceuil(this.pageMissionSuivant);
          }
      break;

      case false:
        if(this.pageMissionPrecedent != ' ')
        { this.getListeMissionAcceuil(this.pageMissionPrecedent);}

      break;
    }
  }

// SECTION Update (avec Patch) : changer l'etat des mission à true
  onUpdateMissionStatus(missionSelection:any[]){
      // recuperer la liste des elements à supprmer

    missionSelection.forEach((obj)=>{
        //modifier l'etat de la mission

        if(obj.value.etat_mission == false){
            obj.value.etat_mission = true;
          }
        else {
          obj.value.etat_mission = false;
        }
        //
        this.serviceMission.endMission(obj.value).subscribe(
          (data:any)=>{
              console.log(data);
          },
          (error:any)=>{
              console.log(error);
          },
          ()=>{
            this.getListeMissionAcceuil(this.endPointGlobal)
          }
        )
    })
  }

// SECTION Delete --> Missions
  onSupprimerMissions(missionSelection:any[]){

    // recuperer la liste des elements à supprmer
    console.log(missionSelection)
    missionSelection.forEach((obj)=>{

      this.serviceMission.deleteMission(obj.value.id).subscribe(
        (data:any)=>{
            console.log(data)
        },
        (error:any)=>{
            console.log(error)
        },
        ()=>{
          this.getListeMissionAcceuil("http://127.0.0.1:8000/missions/acceuil/?exercice="+this.exercice_id)
        }
      )
  })
  }

// menu de navigation dans le component
  isAcceuilMission : boolean = true;
  isProgrammerMission : boolean = false;
  isBilan: boolean = false;
  isRetour:boolean = false;
  isImprimer:boolean = false;

  retourToMission:boolean = false;

  openImprimerMission(){
    // envoie de la mission selection pour impression
    this.mission_to_be_print.emit(this.missionSelected[0].value)
  }

  // go to detail des missions
  missionSelectedDetail!:AcceuilMissionList

  openDetailMission():void{
    // envoie de la mission selection pour modification
    this.mission_selected.emit(this.missionSelected[0].value)
  }
  openMenuSeleted():void{
    if(this.navigationSelected.value === "Nouvelle mission") this.go_menu_acceil.emit('programmer');
    if(this.navigationSelected.value === "Bilan") this.go_menu_acceil.emit('bilan');
  }

  // recuperation des missions selection
  missionSelected:MatListOption[] = [];
  onSelectionMissionChange(options: MatListOption[]){
    /**
     * options contient que la liste des elements selectionnés à la fin
     */
    this.missionSelected = options; // recuperation de la liste des mission selectionner dans (MatListOption.value)
  }

    // modal de confirmation: de terminaison ou de suppression
  delai_animation_apparution:string = '300ms';
  delai_animation_disparition:string = '300ms';

  openDialog(
            enterAnimationDuration: string,
            exitAnimationDuration: string,
            textWarning:string
          ): void {

      // parametres de configuration du component modal
      const dialogRef = this.dialog.open(ModalActionMissionComponent, {
        width: '50%',
        enterAnimationDuration,
        exitAnimationDuration,
        disableClose:true,
        height:"250px",
        data:textWarning,
    });

    // EventEnitter à la fermeture du modal
    dialogRef.afterClosed().subscribe(result => {
      if(result=='true' && this.missionSelected.length>0){

        switch(textWarning){
          case 'Etes-Vous sûr de vouloir suppprimer ces missions ?' :
              this.onSupprimerMissions(this.missionSelected);
          break;

          case 'Etes-Vous sûr de vouloir modifier etat de ces missions ?' :
              this.onUpdateMissionStatus(this.missionSelected);
          break;
        }
      }else{}
    });

  }
}
