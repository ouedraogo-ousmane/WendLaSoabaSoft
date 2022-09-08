import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trajets } from '../folderModels/modelGestMission/trajet';
@Injectable({
  providedIn: 'root'
})
export class MissionService {

  /***
   * Declaration des urls
   */
  
   httpOptions = {}
   public token:any;
   readonly urlPath       = "http://127.0.0.1:8000/maintenances/";
   readonly urlPiece      = "http://127.0.0.1:8000/maintenances/pieces/";
   readonly urlInfosEnreg = "http://127.0.0.1:8000/maintenances/coutPieces/";
 
   constructor(private http:HttpClient) {
     this.token = localStorage.getItem("token")
     console.log(this.token)
     this.httpOptions = {
        headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': "WEND-PANGA " + this.token
         }) 
     }
   }

    /**
   * Cette methode permet de recuperer la liste de tous les chemins
   */
  getAllPath():Observable<Trajets[]>{
  
    return this.http.get<Trajets[]>(this.urlPath,this.httpOptions);
  }

}
