import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
   dataFiltre : any = "";
   IsWait : boolean = true;
   noData : boolean = false;
   dataSource = new MatTableDataSource<IResults>(this.listeExercice);

 
   constructor(
     private router : Router,
     private route : ActivatedRoute,
     private exerciceService : ExercicesService
   ) { }
 
   ngOnInit(): void {
     this.getAllExercice();
   }

   loginMission(exercice:IResults){
    // transmission de parametre à une route sans specifier la params dans AppRouting
      this.router.navigate(
          ['missions'], { queryParams: {'exercice':exercice.id}});
  }
 
   openPage(url:string,exercice:IResults){
 
     this.router.navigate([url],{queryParams : {'exercice':exercice.id}});
 
   }

   /**
    * Cette methode ci-dessous permet de filtrer les données 
    */

   applyFiltrer(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
    
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
         //console.log(this.listeExercice);
       },
       (error)=>{
         console.log("Erreur detecté de type ",error);
       },
       ()=>{
         console.log("Données complétés");
         this.IsWait = false;
         if(this.listeExercice.length ==0){
          this.noData = true;
         }
       }
     )
   }

}
