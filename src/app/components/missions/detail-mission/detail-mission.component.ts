import { Component, Input, OnInit, AfterContentInit, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AcceuilMissionList } from '../Imission';
import { ProgrammerService } from '../programmer/programmer.service';
import { IchauffeursVehicule, Iclients, Idepenses, InfoPesee, Iproduits, Itrajets } from '../programmer/iprogrammer';
import { SdetailMissionService } from './sdetail-mission.service';
import * as moment from 'moment';

  // const toSelect = this.patientCategories.find(c => c.id == 3);
  // this.patientCategory.get('patientCategory').setValue(toSelect);
  // <child-selector (bookTitleCreated)=onBookAdded($event)></child-selector>


@Component({
  selector: 'app-detail-mission',
  templateUrl: './detail-mission.component.html',
  styleUrls: ['./detail-mission.component.css']
})
export class DetailMissionComponent implements OnInit,  AfterContentInit, OnDestroy {

  @Input() Mission!: AcceuilMissionList  ;
  @Input() exercice_id!:number;

  @Output()
  back_to_list_mission:EventEmitter<string> = new EventEmitter();

  sub!:Subscription

  // recuperation de la mission a voir le detail
  constructor(
    private fb:FormBuilder,
    private programmerService:ProgrammerService,
    private detailService:SdetailMissionService) {}

formMission = this.fb.group({

      infoMission:this.fb.group({
        date_mission:['', {validators:[Validators.required]}],
        motif:['', {validators:[Validators.required]}],
        chauffeur:['', {validators:[Validators.required]}],
        trajet_concerne:[0, {validators:[Validators.required]}],
        // nouveau
        choix_mode_evaluation:[false,
            {validators:[Validators.required]}
            // boolean si false: recette Sans Pesage
            // boolean si true: recette avec Pesage
        ]
      }),

      // nouveau initialiser a 0
      infoPoids:this.fb.group({
        premier_poids:[0],
        deuxieme_poids:[0],
      }),

      liste_depenses:this.fb.array([]),
      liste_produits:this.fb.array([]),
      liste_new_produit:this.fb.array([])
    })

listeChauffeurs :IchauffeursVehicule [] = [];

motifs_mission:any[]=['Approvissionnement', 'Livraision'];
listeTrajets!:Itrajets[];
listeClients:Iclients[]=[];
listesProduits:Iproduits[] = [];
listesDepenses:Idepenses[] = [];
// nouveau
listeClients_to_set!:number[];

ngOnInit(): void {
    this.getListesChauffeurVehicules();
    this.getInfoPesee();
    console.log(this.Mission)
}

  // New SECTION --> Insertion des donnees la mission a modifier dans le formulaire
ngAfterContentInit(): void {
       // insertion de la motif mission, de la date de mission
       this.missionSelectionDate = this.Mission.date_mission
       this.motifMissionSlectionnee = this.Mission.motif
       this.modeEvalutionMissionChoisie = (this.Mission.produits.length<0)

       // insertion des depenses et produits de la mission a editer dans le template
       this.AjoutListeDepenseMission_toUpdate();
       this.AjoutListeProduitsMission_toUpdate();

      // set the value
      this.formMission.get('infoMission')?.get('trajet_concerne')?.setValue(this.Mission.trajet.id)
}
missionConcerneeParEdition!:any;
missionSelectionDate!:Date; // date de la mission selectionner
motifMissionSlectionnee!:string;
modeEvalutionMissionChoisie!:boolean;

compareTrajetFn(c1: any, c2: AcceuilMissionList) {
    return  c2.trajet.id === c1 ;
}

compareChauffeurFn(c1:any, c2:AcceuilMissionList){
    return c2.vehicule.id === c1;
}
  // nouveau
compareClientsFn(c1:any, c2:any){
    for(let i=0 ; i<c2.length;i++){
      if(c2[i].client_concerne__id == c1) {

        return true
      }
    }
    return false
}

AjoutListeDepenseMission_toUpdate(){
    this.Mission.depenses.forEach(element=> {
        this.depensesFieldAsFormArray.push(
          this.depenseControleur(element.intitule_depense__intitule,element.id || 0,element.montant,element.intitule_depense__id || 0));

    })

    // disabled le champs nom
    const fg = this.formMission.get('liste_depenses') as FormArray
    fg.controls.forEach(control=>{ // parcours de chaque formGroup
      control.get('intitule')?.disable() // recuperation du champs nom et desactivation
});
}

AjoutListeProduitsMission_toUpdate(){
    this.Mission.produits.forEach(element=>{

      this.produitsFieldAsFormArray.push(
        this.produitsControleur(element.produit__nom,element.produit__id || 0,element.qte_produit, 0, element.id || 0));
    })

     // pour desactiver le champs nom du produit selectionne
   const fg = this.formMission.get('liste_produits') as FormArray // recuperation du tabl formarray de produit

   // Probleme à resoudre
    fg.controls.forEach(control=>{ // parcours de chaque formGroup
          control.get('nom')?.disable() // recuperation du champs nom et desactivation
          control.get('client_concerne')?.disable() // recuperation du champs nom et desactivation
    })
}
/* generation automatique des champs de saisie*/

    //Pour depenses
depenseSelectionnes = new FormControl(''); // controle de recuperation des depenses

  // nombre de depenses selectionner
get nombreDepenses():any{
    const depenseSelection:any= this.depenseSelectionnes.value
    if(depenseSelection?.length!=0){
      return depenseSelection?.length
    }
    return 0
}

onSelectionDepenseTeminer(){
    this.AjouterDepenseField();
   // pour desactiver le champs intitule de la depense selectionne
   const fg = this.formMission.get('liste_depenses') as FormArray // recuperation du tabl formarray de depenses

   //   Probleme à resourdre
   fg.controls.forEach(control=>{ // parcours de chaque formGroup
         control.get('intitule')?.disable() // recuperation du champs nom et desactivation
         // ajout de quelques validateurs
         control.get('montant')?.setValidators(Validators.required)
   });

}

get depensesFieldAsFormArray():any{
    //methode d'obtention au champs dans le form comme un FormArray
    return this.formMission.get('liste_depenses') as FormArray
}

depenseControleur(intitule:string,id:number ,quantite:number, id_intitule:number):any{
  // creation du nouveau controleur à ajouter automatiquement dans le FormArray

  return this.fb.group({
    intitule:this.fb.control(intitule), // utiiser pour l'affichage
    id:this.fb.control(id),
    intitule_depense : [ id_intitule, {validators:[Validators.required]}], // utiiser pour le sauvegard
    montant: [quantite, {validators:[Validators.required]}],
  })}

AjouterDepenseField():void{
  // ajout du champ au formulaire
  const depensesSelectionne:any= this.depenseSelectionnes.value
  if(depensesSelectionne?.length!=0){
    depensesSelectionne.forEach((element:any) => {
      const depense_to_be_add = this.listesDepenses.find(dep=>dep.id==element) // recuperation du nom

      this.depensesFieldAsFormArray.push(this.depenseControleur(depense_to_be_add?.intitule || ' ',element,0,depense_to_be_add?.id || 0));
      this.depenseSelectionnes.reset()
      });

      this.depenseSelectionnes = new FormControl()
  }


}

supprimerDepenseField(i:number):void{
    // suppression du champs du fromulaire
    this.depensesFieldAsFormArray.removeAt(i)
}

  //Pour Produit
produitSelectionnes = new FormControl(''); //

  // ecouter apres chaque selection de produit
onSelectionTeminer(){
   this.AjouterProduitField();

   // pour desactiver le champs nom du produit selectionne
   const fg = this.formMission.get('liste_produits') as FormArray // recuperation du tabl formarray de produit

   // Probleme à resoudre
    fg.controls.forEach(control=>{ // parcours de chaque formGroup
          control.get('nom')?.disable() // recuperation du champs nom et desactivation
          // ajout de quelque validateurs
          control.get('quantite')?.setValidators(Validators.required)
          control.get('cout_unitaire')?.setValidators(Validators.required)
          control.get('client')?.setValidators(Validators.required)
    })
}

get produitsFieldAsFormArray():any{
    //methode d'obtention au champs dans le form comme un FormArray
    return this.formMission.get('liste_produits') as FormArray
}

produitsControleur(nom:string, id:number,quantite:number, cout_unitaire:number, prod_id:number):any{
  // creation du nouveau controleur à ajouter automatiquement dans le FormArray

  return this.fb.group({
    produit:this.fb.control(id),
    nom : this.fb.control(nom),
    id:this.fb.control(prod_id),
    qte_produit:[quantite, [Validators.required]],
    cout_unitaire:[cout_unitaire, [Validators.required]],
    client_concerne:['', []]
  })
}

get nombreProduit():any{
  const produitSelectionne:any= this.produitSelectionnes.value
  if(produitSelectionne?.length!=0){
    return produitSelectionne?.length
  }
  return 0
}

AjouterProduitField():void{
  // ajout du champ au formulaire
  const produitSelectionne:any= this.produitSelectionnes.value

  if(produitSelectionne?.length!=0){
    if(produitSelectionne !=null){
        produitSelectionne.forEach((element:any) => { // chaque element est un id
          const prod_to_be_add = this.listesProduits.find(prod=>prod.id==element) // ajout du nom du produit
          this.produitsFieldAsFormArray.push(this.produitsControleur(prod_to_be_add?.nom || ' ',element,0, 0, prod_to_be_add?.id || 0));
          this.produitSelectionnes.reset()
          });
    }
  }
}

supprimerProduitField(i:number):void{
    // suppression du champs du fromulaire
    this.produitsFieldAsFormArray.removeAt(i)
}

// section evaluation des recettes
choix_mode_evaluation:boolean = false // boolean d'ecoute du mode choisie
change_mode_evaluation(){
  const choix:any = this.formMission.get('infoMission')?.get('choix_mode_evaluation')?.value
  this.choix_mode_evaluation = choix;

  // ajout de validateurs lors de l'enregistrement des pesees
  if(choix == true){
    this.formMission.get('infoPoids')?.get('premier_poids')?.setValidators(Validators.required)
    this.formMission.get('infoPoids')?.get('deuxieme_poids')?.setValidators(Validators.required)
  }
  else{
    this.formMission.get('infoPoids')?.get('premier_poids')?.clearValidators();
    this.formMission.get('infoPoids')?.get('deuxieme_poids')?.clearValidators();
    this.formMission.get('infoPoids')?.reset();
  }

  /*
    this.choix_mode_evaluation = this.formMission.get('infoMission')?.get('choix_mode_evaluation')?.value
      error: pas d'affection de undefine a un boolean
    */
}

/* inter-action avec la bd*/
getListeIntituleTrajets():void{
        this.programmerService.getListeIntituleTrajets()
        .subscribe(
          (data:Itrajets[])=>{
            this.listeTrajets = data;
          },
          error=>{
            console.log(error)
          },
          ()=>{
            setTimeout(()=>{
              this.getListeIntituleProduits(); //implementation de l'anatomicite : transaction
            }, 2000)

          }
        )
}
getListeIntituleProduits():void{
        this.programmerService.getListeIntituleProduits()
        .subscribe(
          (data:Iproduits[])=>{
            this.listesProduits = data;
            console.log(this.listesProduits)
          },
          error=>{
            console.log(error)
          },
          ()=>{
            this.getListeIntituleDepenses(); //implementation de l'anatomicite : transaction
          }
        )
}

getListesChauffeurVehicules():void{
      this.programmerService.getListesChauffeurVehicules()
      .subscribe(
        (data:IchauffeursVehicule[])=>{
          this.listeChauffeurs= data;
        },
        error=>{
          console.log(error)
        },
        ()=>{
          this.getListeIntituleTrajets(); //implementation de l'anatomicite : transaction
        }
      )
}

getListeIntituleDepenses():void{
        this.programmerService.getListeIntituleDepenses()
        .subscribe(
          (data:Idepenses[])=>{
            this.listesDepenses= data;
          },
          error=>{
            console.log(error)
          },
          ()=>{
            this.getListeClients(); //implementation de l'anatomicite : transaction
          }
          )
}

getListeClients():void{
      this.programmerService.getListeClients()
        .subscribe(
          (data:Iclients[])=>{
            this.listeClients= data;
            console.log(this.listeClients)
          },
          error=>{
            console.log(error)
          },
          ()=>{}
          )
}

  // SECTION Update MISSION

get isMissionFormulaireValide():boolean{
      return this.formMission.valid;
}

saveMission(){
    // mise a jour des differents champs
    if(this.isMissionFormulaireValide){

      this.updateProduitList();
      this.updateDepenseList();
      this.updateMission(); // uniquement la date

      if(this.choix_mode_evaluation ==true)
          this.updateInfoPesee();
      else
          this.deleteInfoPesee();
    }
    else
      console.log('non valid')

}

  // save info pesee: nouvelle section
data_pesee!:InfoPesee[];

saveInfoPesee():void{

  // construction de l'object
  const instance_poids:InfoPesee = {
    id_mission: this.Mission.id,
    premier_pese:this.formMission.get('infoPoids')?.get('premier_poids')?.value || 0,
    deuxieme_pese: this.formMission.get('infoPoids')?.get('deuxieme_poids')?.value || 0,
  }

  // envoie de l'object
  this.detailService.saveInfoPesee(instance_poids).subscribe(
    (data:InfoPesee)=>{
      console.log(data)
    },
    (error)=>{
      console.log(error)
    },
    ()=>{
    },
  )
}

updateInfoPesee():void{
  if(this.data_pesee.length === 0)
    this.saveInfoPesee();

  else{

      const instance_poids:InfoPesee = {
        id:this.data_pesee[0].id,
        id_mission: this.Mission.id,
        premier_pese:this.formMission.get('infoPoids')?.get('premier_poids')?.value || 0,
        deuxieme_pese: this.formMission.get('infoPoids')?.get('deuxieme_poids')?.value || 0,
      }
      this.detailService.updateInfoPesee(instance_poids).subscribe(
        (data:InfoPesee)=>{
          console.log(data)
        },
        (error)=>{
              console.log(error.error);
        },
        ()=>{},
      )
  }

    // envoie de l'object

}

deleteInfoPesee():void{
  // suppression
  if(this.data_pesee.length!= 0){
    const id:number = this.data_pesee[0].id || 0;

    this.detailService.deleteInfoPesee(id).subscribe(
      (data:InfoPesee)=>{
        console.log(data)
      },
      (error)=>{
        console.log(error)
      },
      ()=>{},
    )
  }

}

getInfoPesee():void{
  // recuperation des information de pesage
  this.detailService.getInfoPesee(this.Mission.id).subscribe(
    (data:InfoPesee[])=>{
      this.data_pesee = data;
      console.log(this.data_pesee )
    },

    (error)=>{
      if(error.status == 404){
        console.log(error)
      }
      console.log(error)
    },
    ()=>{
      this.AjouterInfoPesee_IHM();

    },
  )
}

AjouterInfoPesee_IHM(){
    if(this.data_pesee.length>0){
      this.formMission.get('infoMission')?.get('choix_mode_evaluation')?.setValue(true);
      this.formMission.get('infoPoids')?.get('premier_poids')?.setValue(this.data_pesee[0].premier_pese)
      this.formMission.get('infoPoids')?.get('deuxieme_poids')?.setValue(this.data_pesee[0].deuxieme_pese)
    }
    this.change_mode_evaluation();
}

updateProduitList():void{
 // ajout et modification

  const listesProduits:any[] = this.formMission.get('liste_produits')?.value || [];
  let client:number = 0;

  listesProduits.forEach(element=>{
    element.exercice = Number(this.exercice_id);
    element.mission = this.Mission.id;
    client = this.Mission.produits.find(value=>value.id == element.id)?.client_concerne__id || 0
    element.client_concerne = client;
  })

  listesProduits.map(element=>{
    this.detailService.updateListeProduits(element).subscribe(
      (data)=>{
        console.log(data)
      },
      (error)=>{
        console.log(error)
      },
      ()=>{
        this.saveInfosProduit(this.Mission.id);
      }
    )
  })

  // suppression: recuperer les produits supprimer

  let is_find:any;

  this.Mission.produits.forEach(element=>{
    is_find = listesProduits.find(value=>value.id === element.id)

    if(is_find == undefined) {
      this.detailService.deleteListeProduits(element.id||0).subscribe(
        (data)=>{
          console.log(data)
        },
        (error)=>{
          console.log(error)
        },
        ()=>{},
      )}
  })
}

updateDepenseList():void{
  let liste_depenses:any[] = this.formMission.get('liste_depenses')?.value || [];

  // make it corresponding with the db depense structure
  liste_depenses.forEach(element=>{
    element.exercice = this.exercice_id;
    element.mission = this.Mission.id;

  })
    // ajout && modification
  liste_depenses.map(element=>{
    this.detailService.updateListeDepenses(element).subscribe(
      (data)=>{
        console.log(data)
      },
      (error)=>{
          if(error.status== 404){
            this.programmerService.saveListeDepenses([element]).subscribe(
              (data)=>{
                this.Mission.depenses.push(data) // eviter de le chercher lors de la supression
              },
              (error)=>{
                console.log(error)
              },
              ()=>{},
            );
          }
        else
          console.log(error)

        },
      ()=>{},
    );
  })

  // suppression: recuperer les depenses supprimer

  let is_find:any;

  this.Mission.depenses.forEach(element=>{
    is_find = liste_depenses.find(value=>value.id === element.id)

    if(is_find == undefined) {
      this.detailService.deleteListeDepenses(element.id||0).subscribe(
        (data)=>{
          console.log(data)
        },
        (error)=>{
          console.log(error)
        },
        ()=>{},
      )}
  })


}
updateMission():void{
  const date = moment(String(this.formMission.get('infoMission')?.value.date_mission)).format('YYYY-MM-DD');

  if(date!=String(this.Mission.date_mission)){

    const mission_instance:any = {
      id:this.Mission.id,
      exercice_conerne:Number(this.exercice_id),
      vehicule_concerne:this.Mission.vehicule.id ,
      trajet_concerne:this.Mission.trajet.id,
      date_mission:moment(String(this.formMission.get('infoMission')?.value.date_mission)).format('YYYY-MM-DD'),
      motif:this.Mission.motif,
      etat_mission:false
    }

    console.log(mission_instance);
    this.detailService.updateMission(mission_instance).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      },
      ()=>{}
    )
  }

}

getProductSelectedClient:any;
selectedClient(){

  console.log(this.formMission.get('liste_produits')?.get('client_concerne')?.value)
}
  // ecouter apres chaque selection de produit
onSelectionNewTeminer(){
    this.AjouterNewProduitField();

    // pour desactiver le champs nom du produit selectionne
    const fg = this.formMission.get('liste_new_produit') as FormArray // recuperation du tabl formarray de produit

    // Probleme à resoudre
     fg.controls.forEach(control=>{ // parcours de chaque formGroup
           control.get('Newnom')?.disable() // recuperation du champs nom et desactivation
           // ajout de quelque validateurs
          control.get('qte_New_produit')?.setValidators(Validators.required)
          control.get('cout_New_unitaire')?.setValidators(Validators.required)
          control.get('client_New_concerne')?.setValidators(Validators.required)
    })
}

get produitsNewFieldAsFormArray():any{
     //methode d'obtention au champs dans le form comme un FormArray
      return this.formMission.get('liste_new_produit') as FormArray
}

produitsNewControleur(nom:string, id:number,quantite:number, cout_unitaire:number, prod_id:number):any{
  // creation du nouveau controleur à ajouter automatiquement dans le FormArray

  return this.fb.group({
    produit:this.fb.control(id),
    Newnom : this.fb.control(nom),
    id:this.fb.control(prod_id),
    qte_New_produit:[quantite, [Validators.required]],
    cout_New_unitaire:[cout_unitaire, [Validators.required]],
    client_New_concerne:['', []]
  })
}

get nombreNewProduit():any{
  const produitSelectionne:any= this.produitSelectionnes.value
  if(produitSelectionne?.length!=0){
    return produitSelectionne?.length
  }
  return 0
}

AjouterNewProduitField():void{
   // ajout du champ au formulaire
  const produitSelectionne:any= this.produitSelectionnes.value

  if(produitSelectionne?.length!=0){
     produitSelectionne.forEach((element:any) => { // chaque element est un id
       const prod_to_be_add = this.listesProduits.find(prod=>prod.id==element) // ajout du nom du produit
      this.produitsNewFieldAsFormArray.push(this.produitsNewControleur(prod_to_be_add?.nom || ' ',element,0, 0, prod_to_be_add?.id || 0));
      this.produitSelectionnes.reset()
      });
  }
}

supprimerNewProduitField(i:number):void{
     // suppression du champs du fromulaire
    this.produitsNewFieldAsFormArray.removeAt(i)
}

saveInfosProduit(id:number){

  const listesProduits:any[] = this.formMission.get('liste_new_produit')?.value || []
  let prod_instance:any[] = [];

  if(listesProduits.length>0){

      listesProduits.forEach(produit=>{
        const prod = {
          cout_unitaire: produit.cout_New_unitaire,
          qte_produit: produit.qte_New_produit,
          produit: produit.produit,
          mission:id ,
          client_concerne: produit.client_New_concerne,
          exercice: Number(this.exercice_id)
        }

        prod_instance.push(prod)
      });

      this.programmerService.saveListeProduits(prod_instance).subscribe(
        (data)=>{
          console.log(data)
        },
        (error)=>{
          console.log(error)
        },
        ()=>{},
      )
  }
}

// a terminer
gotoAcceuiMission(){
  this.back_to_list_mission.emit('Acceuil')
}
ngOnDestroy(): void {
      //this.sub.unsubscribe();
}

}
