import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepenseMission } from '../folderModels/modelGestRecette/depenses-mission';
import { InfosDepenseMission } from '../folderModels/modelGestRecette/infos-depenses-mission';
import { Maintenances } from '../folderModels/modelGestMaintenance/maintenance';
import { Piece } from '../folderModels/modelGestMaintenance/pieces';
import { InfosEnregPiece } from '../folderModels/modelGestMaintenance/infos-enreg-pieces';
@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  
  constructor(private http:HttpClient) { }

  readonly baseURL = 'http://localhost:3500/depenseMission'
  readonly infosDepenseURL = 'http://localhost:3500/infosDepense'

  /**
   * Cette methode permet de recuperer la liste de toutes les maintenances
   */
  getMaintenance():Observable<Maintenances[]>{

    return this.http.get<Maintenances[]>(this.baseURL);
  }

  /**
   * Cette methode permet de recuperer la liste de toutes les pieces
   */
   getPieces():Observable<Piece[]>{

    return this.http.get<Piece[]>(this.baseURL);
  }


  /**
   * Methode d'envoie des données d'une maintenance donnée
   */

   sendOrDeleteMaintenance(data:Maintenances,method:string="post"):Observable<Maintenances>{

    if(method==="post"){
      return this.http.post<Maintenances>(this.baseURL + "/depense",data);
    }
    else if(method==="put"){
      return this.http.put<Maintenances>(this.baseURL + "/depense",data);
    }

    return this.http.delete<Maintenances>(this.baseURL + `/${data.id_maint}`);

  }

  /**
   * Methode d'envoie ou de modification des données d'une piece donnée
   */

   sendOrDeletePiece(data:Piece,method:string="post"):Observable<Piece>{

    if(method==="post"){
      return this.http.post<Piece>(this.baseURL + "/depense",data);
    }else if(method==="put"){
      return this.http.put<Piece>(this.baseURL + "/depense",data);
    }
    return this.http.delete<Piece>(this.baseURL + "/depense"+`/${data.id_piece}`);

  }

  /**
   * Methode d'envoie des données d'une maintenance données
   */

   sendOrDeleteInfosEnregistrement(data:InfosEnregPiece,method:string="post"):Observable<InfosEnregPiece>{

    if(method==="post"){
      return this.http.post<InfosEnregPiece>(this.baseURL + "/depense",data);
    }
    else if(method==="put"){
      return this.http.put<InfosEnregPiece>(this.baseURL + "/depense",data);
    }
    
    return this.http.delete<InfosEnregPiece>(this.baseURL + `/${data.id_maint}`);
      

  }




/****
 * 
 * END POINT FOR THIS FILE ************
 */


  sendImage(data:any,id_depense:number,id_mission:number):Observable<any>{

    return this.http.put<any>(this.baseURL+ `/${id_depense}`+`/${id_mission}`,data);

  }


}
