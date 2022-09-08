import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercices } from 'src/app/interfaces/exercices';
import { ExercicesService } from 'src/app/services/exercice.service';
import { IExercices, IResults } from '../../folderModels/modelGestEntreprise/exercice';
@Component({
  selector: 'app-liste-exercice',
  templateUrl: './liste-exercice.component.html',
  styleUrls: ['./liste-exercice.component.css']
})
export class ListeExerciceComponent implements OnInit {

  
  /**
   *  Declaration des variables
   */

   listeExercice : IResults[] = [];

   panelOpenState = false;
 
   constructor(
     private router : Router,
     private route : ActivatedRoute,
     private exerciceService : ExercicesService
   ) { }
 
   ngOnInit(): void {
     this.getAllExercice();
   }
 
   openPage(url:string){
 
     this.router.navigate([url])
 
   }
 
   openMaintenance(){
 
     this.router.navigate(['maintenance'])
 
   }
 
   openBilan(){
 
     this.router.navigate(['bilan'])
 
   }
 
   /**
    * Cette methode ci-dessous permet de recuperer les données 
    */
 
   getAllExercice(){
     this.exerciceService.getListeExercices().subscribe(
       (dataGetted:any)=>{
         this.listeExercice = dataGetted.results;
         
         
         console.log(this.listeExercice);
       },
       (error)=>{
         console.log("Erreur detecté de type ",error);
       },
       ()=>{
         console.log("Données complétés");
       }
     )
   }

}
