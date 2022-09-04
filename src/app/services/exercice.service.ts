import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { Exercices } from 'src/app/folderModels/modelGestEntreprise/exercice';


interface statusResp{
  status:boolean;
}

interface dlteExercice{

  state:[
    {
      exercices:Exercices[],
      error:string,
      status:boolean;
    }
  ];

}

interface result{
  result:Exercices[];
}
@Injectable({
  providedIn: 'root'
})
export class ExerciceService {

  
  //url de la table exercice
  readonly baseUrl = 'http://localhost:3500/exercices';
  readonly baseUrl1 = '../assets/TestBD/checkCreateExercice.json';


  constructor(
    private http : HttpClient
  ) {}


    checkCreateExercice():Observable<statusResp[]>{
      return this.http.get<statusResp[]>(this.baseUrl1);
    }

   //Methode de recuperation de toutes les exercices

   getAllExericeFromServer():Observable<result>{
      return this.http.get<result>(this.baseUrl);
    }

    createExercice(exercice:any):Observable<result>{

      return this.http.post<result>(this.baseUrl, exercice);

    }


    //Methode de suppression d'une données dans Exercice
    DeletesExercice(exercices:string[]):Observable<statusResp>{
      return this.http.delete<statusResp>(this.baseUrl+`/${exercices}`);
    } 
}
