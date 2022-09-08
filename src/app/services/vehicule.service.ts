import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehiculesDuParc } from '../folderModels/modelGestMission/vehicule-du-parc';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  /**
   * Declaration des urls
   */

  urlvehicule = 'http://127.0.0.1:8000/missions/vehiculeParcs';

  httpOptions = {};
  public token : any;

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
    * Cette methode ci-dessous permet de recuperer toutes les vehicules
    */

    
  getVehicules():Observable<VehiculesDuParc[]>{
    this.httpOptions = {
      method:'GET',
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': "WEND-PANGA " + this.token
       }) 
   }

    return this.http.get<VehiculesDuParc[]>(this.urlvehicule ,this.httpOptions);
  }
}
