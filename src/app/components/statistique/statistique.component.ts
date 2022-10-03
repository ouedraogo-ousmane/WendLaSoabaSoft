import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExercicesService } from '../../services/exercice.service';
import { Subscription } from 'rxjs';
import { IResults } from '../../folderModels/modelGestEntreprise/exercice';
import { DatasetController } from 'chart.js';

export interface Serie{
  name : string;
  value : number;
}
export class Stat {
  name : string;
  series : Serie[];

}


@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})


export class StatistiqueComponent implements OnInit,OnDestroy {

  listeStat : {name:string;series:{ name: string; value: number; }[]}[]  = [];


  
  isLoaded : boolean = false;

  exerciceSub : Subscription = new Subscription();
  exerciceStatSub : Subscription = new Subscription();

  listeExercice :IResults[] = [];



  constructor(private formBuilder : FormBuilder,
              private serviceExercice : ExercicesService) { 
   // Chart.register(...registerables)
  }

  ngOnInit(): void {
  
      this.getAllExercice();
   

    
  }



  getAllExercice(){
    
    this.exerciceStatSub =this.serviceExercice.getExerciceStat().subscribe(
      (dataGetted:any)=>{
         let listeExerciceStat = dataGetted.results;
      //  console.log(this.listeExercice)
        let series: { name: string; value: number; }[] = [];
        let exerciceStat:{name:string;series:{ name: string; value: number; }[]}[] =[];

        for(let data of listeExerciceStat){
           // console.log(donnee);
              let result= data;
              let nom = "Exercice " + data.annee;
              series = [
                {
                  name: "Depenses Totales",
                  value: result.totalDepenses
                },
                {
                  name: "Recette Totales",
                  value: result.totalRecette
                }
              ]
           

              exerciceStat.push({
                name:nom,
                series:series
              });
             // this.exercice.push(stat);
              

            // console.log(exerciceStat)
             // console.log(this.exercice);
              
            
          

        }

        this.listeStat = exerciceStat;
        
        this.isLoaded = true;
    
      },
      (error)=>{
        console.log("Erreur detecté de type ",error);
      },
      ()=>{
        console.log("Données complétés");

      })
  }



  ngOnDestroy(): void {
      //this.exerciceSub.unsubscribe();
      this.exerciceStatSub.unsubscribe();
  }
}
