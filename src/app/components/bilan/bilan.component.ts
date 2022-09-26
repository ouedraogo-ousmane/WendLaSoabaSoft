import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BilanService } from '../../services/bilan.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bilan', 
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class BilanComponent implements OnInit {

  readonly urlStatChauff = "http://127.0.0.1:8000/missions/info_finance/";
  readonly urlStatTypeDep = "http://127.0.0.1:8000/missions/depStatistique/";
  readonly urlStatExercice = "http://127.0.0.1:8000/exercices/";

  statChauffSub! : Subscription;
  statTypeDepSub! : Subscription;
  statExerciceSub! : Subscription;

 

  displayedColumns: string[] = ['id','nom', 'depense', 'recette', 'rentabilite','pourcentage'];
  displayed1Columns: string[] = ['intitule', 'montant','pourcentage'];
  displayed2Columns: string[] = ['id','name', 'value'];
  displayedExerciceColumns: string[] = ['annee', 'totalDepenses','totalRecette','rentabilite'];
  displayedColumnsChauffeur: string[] = ['immat','chauffeur', 'total_depenses','total_recette','rentabilite'];
 // dataSource = this.data;           
  filtreFormGroup! : FormGroup;

  exercice_id! : number;

  exercice : any ={};
  exerciceData : any = [];
  listeExercice : any =[];


  chauffeurStatData : {name:string;series:{ name: string; value: number; }[]}[]  = [];
  listeChauffeur : any  = [];

  typeDepense : any = [];
  typeDepenseStat : {name:string;value:number}[]  = [];



  driverAvailable : boolean = false;
  statTypeAvailable : boolean = false;
  statExercice : boolean = false;

  showExerciceGraphique : boolean = false;
  showDriverGraphique : boolean = false;
  showType : boolean = false;


  constructor(private formBuilder : FormBuilder,
              private bilanService : BilanService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.exercice_id = this.getId_exercice();
    this.getStatExercice();
    this.getStatChauffeur();
    this.getStatTypeDepense();
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

  

  showGraphiqueExercice(){
    this.showExerciceGraphique = true;
  }

  hideGraphiqueExercice(){
    this.showExerciceGraphique = false;
  }

  showGraphiqueDriver(){
    this.showDriverGraphique = true;
  }

  hideGraphiqueDriver(){
    this.showDriverGraphique = false;
  }

  showTypeGraphique(){
    this.showType = true;
  }

  hideTypeGraphique(){
    this.showType = false;
  }


  getTotal(){
    let result = 0;
    for(let d of this.typeDepense){
      result += d.montant;
    }

    return result;
  }

  /**
   * Cette methode ci-dessous permet de recuperer les statistiques des chauffeurs
   */

  getStatChauffeur(){

    this.statChauffSub = this.bilanService.bilanApi(this.urlStatChauff,this.exercice_id).subscribe(
      (data:any)=>{

        console.log(data.results);

        this.listeChauffeur = data.results;
        let series: { name: string; value: number; }[] = [];
        let chauffeurStat:{name:string;series:{ name: string; value: number; }[]}[] =[];

        let nom : string;

        for(let donnee of this.listeChauffeur){
          nom = donnee.chauffeur.nom +' ' + donnee.chauffeur.prenom;
          console.log(nom)
          series=[
            {
              name:"Depenses totales",
              value:donnee.total_depenses
            },
            {
              name:"Recettes totales",
              value:donnee.total_recette
            }
          ]

          chauffeurStat.push({
            "name":nom,
            "series":series
          });
        }

        //console.log(chauffeurStat)

        this.chauffeurStatData = chauffeurStat;
        //console.log(this.chauffeurStatData)


      },
      (error)=>{

        console.log("Erreur rencontré de type ",error);
        
      },
      ()=>{

        this.driverAvailable = true;
        
      }
    );
  }

   /**
   * Cette methode ci-dessous permet de recuperer les statistiques de l'exercice en cours
   */

    getStatExercice(){
      this.statExerciceSub = this.bilanService.bilanApi(this.urlStatExercice,this.exercice_id).subscribe(
        (data:any)=>{
          //console.log(data);
          this.exercice = data;
          this.listeExercice = [this.exercice];
          this.exerciceData = [
            {
              name:"Depenses Totales",
              value : this.exercice.totalDepenses
            },
            {
              name:"Recettes Totales",
              value : this.exercice.totalRecette
            }
          ];

        },
        (error)=>{
  
          console.log("Erreur rencontré de type ",error);
          
        },
        ()=>{
          this.statExercice = true;

          
        }
      );
    }


    
   /**
   * Cette methode ci-dessous permet de recuperer les statistiques de l'exercice en cours
   */

    getStatTypeDepense(){
      this.statTypeDepSub = this.bilanService.bilanApi(this.urlStatTypeDep,this.exercice_id).subscribe(
        (data:any)=>{

          console.log(data);

          this.typeDepense = data;

          for(let donnee of this.typeDepense){
            this.typeDepenseStat.push({
              name:donnee.intitule,
              value:donnee.montant
            })
          }

          console.log(this.typeDepenseStat);
        },
        (error)=>{
  
          console.log("Erreur rencontré de type ",error);
          
        },
        ()=>{
          this.statTypeAvailable = true;
          
        }
      );
    }

}
