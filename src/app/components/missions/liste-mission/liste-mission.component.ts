import { Component, OnInit, Output } from '@angular/core';
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

  sub:Subscription = new Subscription();
  exercice_id:number = -1; // exercice parent à la mission

  //ajout
 typesOfShoes: string[] = ['ouedradrogo Amado', 'Karim Is', 'Ms  salif', 'Moccasins', 'Sneakers'];

 menuMission:any[]=[
     {nom:'Acceuil', ulrs:'acceuil'},
     {nom:'Nouvelle mission', urls:'programmer'},
     {nom:'Bilan', urls:'bilan'},
     {nom:'Retour', urls:'exercices'},
 ];

 endPointGlobal:string = '';

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

       //recuperer la liste des missions qui lui sont relative
       const endpointListeMission = "http://127.0.0.1:8000/missions/acceuil/?exercice="+queryParam.params.exercice
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
        }
      )

  }

  listerMissionParStatus(statusCh:any){
    // bouton de filtrage de mission en fonction du status : changement du contenu du tableau
    // listeMission en fonction du cas
     if(statusCh==false) this.listeMission = this.listeMissionTerminee
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
    this.listeMission = this.listeMissionEnCours;
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
        { this.getListeMissionAcceuil(this.pageMissionSuivant);}
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

        if(obj.etat_mission == false){
           obj.etat_mission = true;
          }
        else {
          obj.etat_mission = false;
        }
        //
        this.serviceMission.endMission(obj).subscribe(
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
    missionSelection.forEach((obj)=>{

      this.serviceMission.deleteMission(obj.id).subscribe(
        (data:any)=>{
            console.log(data)
        },
        (error:any)=>{
            console.log(error)
        },
        ()=>{
          this.getListeMissionAcceuil(this.endPointGlobal)
        }
      )
  })
  }

// menu de navigation dans le component
  isAcceuilMission! : boolean;
  isProgrammerMission : boolean = false;
  isBilan: boolean = false;
  isRetour:boolean = false;

  gotoMenuItem(nom:string){

    switch(nom){
      case 'acceuil' :
          this.isAcceuilMission = true;
          this.isProgrammerMission = false;
          this.isRetour = false;
          this.isBilan = false;
          this.isdetail = false;

          alert('acceuil')
      break;

      case 'programmer' :
          this.isProgrammerMission = true;
          this.isAcceuilMission = false;
          this.isRetour = false;
          this.isBilan = false;
          this.isdetail = false;

      break;

      case 'bilan' :
        this.isProgrammerMission = false;
        this.isAcceuilMission = false;
        this.isRetour =false ;
        this.isBilan = true;
        this.isdetail = false;

      break;

      case 'exercices' :
        this.isProgrammerMission = false;
        this.isAcceuilMission = false;
        this.isRetour =false ;
        this.isBilan = false;
        this.isdetail = false;
        this.router.navigate(['exercices'])
      break;

      default :
        this.isProgrammerMission = false;
        this.isAcceuilMission = false;
        this.isRetour =false ;
        this.isBilan = false;
        this.isdetail = false;
      break;
    }
  }

  // go to detail des missions
  missionSelectedDetail!:AcceuilMissionList

  openDetailMission():void{
    // reduire le tmp de deplacement
    this.missionSelectedDetail = this.missionSelected[0];
    this.isProgrammerMission = false;
  }

  // recuperation des missions selection
  missionSelected:AcceuilMissionList[] = [];
  onSelectionMissionChange(options: MatListOption[]){
    /**
     ** options : tableau de MatListOption contenant plusieurs option sur les valeurs
     *            selectionnées.(MatListOption.value) contient la liste des valeurs
     *
     ** Algorithme de recuperation des valeurs:
     *      options.map(selected=>console.log(selected.value));
     *
     **     array.filter(obj=>return (obj)) : map chaq obj de array puis retourne un tableau
     *            uniquement un tab de obj respectant la condition
     *
     **     array.map(obj=> { action }) # mapper chq obj de array
     */

    if(this.missionSelected.length>0){

        options.map((selected:any)=>{

          this.missionSelected = this.missionSelected.filter((obj:AcceuilMissionList)=>{

            console.log(selected.value.id)
            return obj.id != selected.value.id
          })
        })
    }
    else  options.map(selected=>this.missionSelected.push(selected.value));

  }
    // modal de confirmation: de terminaison ou de suppression
  delai_animation_apparution:string = '300ms';
  delai_animation_disparition:string = '300ms';

  openDialog(enterAnimationDuration: string,
            exitAnimationDuration: string,
            textWarning:string): void {

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
