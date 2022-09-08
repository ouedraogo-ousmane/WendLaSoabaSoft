import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maintenances } from '../folderModels/modelGestMaintenance/maintenance';
import { Piece } from '../folderModels/modelGestMaintenance/pieces';
import { InfosEnregPiece } from '../folderModels/modelGestMaintenance/infos-enreg-pieces';
@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  /***
   * Declaration des urls
   */
  
  httpOptions = {}
  public token:any;
  readonly urlMaintenance = "http://127.0.0.1:8000/maintenances/";
  readonly urlPiece = "http://127.0.0.1:8000/maintenances/pieces/";
  readonly urlInfosEnreg = "htt p://127.0.0.1:8000/maintenances/coutPieces/";

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
   * Cette methode permet de recuperer la liste de toutes les maintenances
   */
  getMaintenance():Observable<Maintenances[]>{
  
    return this.http.get<Maintenances[]>(this.urlMaintenance,this.httpOptions);
  }

  /**
   * Cette methode permet de recuperer la liste de toutes les pieces
   */
   getPieces():Observable<Piece[]>{
   
    return this.http.get<Piece[]>(this.urlPiece,this.httpOptions);
  }


  /**
   * Methode d'envoie des données d'une maintenance donnée
   */

   sendOrDeleteMaintenance(data:Maintenances,method:string="post"):Observable<Maintenances>{

    if(method==="post"){
       
     
      return this.http.post<Maintenances>(this.urlMaintenance,data,this.httpOptions);
    }
    else if(method==="put"){
      
     
      return this.http.put<Maintenances>(this.urlMaintenance + `${data.id}/detail`,this.httpOptions);
    }
    

    return this.http.delete<Maintenances>(this.urlMaintenance + `${data.id}/detail`,this.httpOptions);

  }

  /**
   * Methode d'envoie ou de modification des données d'une piece donnée
   */

   sendOrDeletePiece(data:Piece,method:string="post"):Observable<Piece>{

    if(method==="post"){
      
      return this.http.post<Piece>(this.urlPiece ,data,this.httpOptions);
    }else if(method==="put"){
      
      return this.http.put<Piece>(this.urlPiece + `${data.id}/detail`,this.httpOptions);
    }
    
    return this.http.delete<Piece>(this.urlPiece + `${data.id}/detail`,this.httpOptions);

  }

  /**
   * Methode d'envoie des données d'une maintenance données
   */

   sendOrDeleteInfosEnregistrement(data:InfosEnregPiece,method:string="post"):Observable<InfosEnregPiece>{

    if(method==="post"){
      
      return this.http.post<InfosEnregPiece>(this.urlInfosEnreg ,data,this.httpOptions);
    }
    else if(method==="put"){
      
      return this.http.put<InfosEnregPiece>(this.urlInfosEnreg + `${data.maintenanceConcernee}/${data.nomPiece}/detail`,this.httpOptions);
    }
    
    return this.http.delete<InfosEnregPiece>(this.urlInfosEnreg + `${data.maintenanceConcernee}`,this.httpOptions);
      

  }




/****
 * 
 * END POINT FOR THIS FILE ************
 */


  sendImage(data:any,id_depense:number,id_mission:number):Observable<any>{

    return this.http.put<any>(this.urlMaintenance+ `${id_depense}`+`${id_mission}`,data);

  }


}
