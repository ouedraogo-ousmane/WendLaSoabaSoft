import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chauffeurs } from '../components/chauffeur/chauffeur';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  private readonly urlChauffeurs ="http://127.0.0.1:8000/missions/chauffeurs/";


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
   * Cette methode permet de recuperer la liste de toutes les maintenances
   */
   getChauffeur():Observable<Chauffeurs[]>{
  
    return this.http.get<Chauffeurs[]>(this.urlChauffeurs,this.httpOptions);
  }


  
  /**
   * Methode d'envoie des données d'une maintenance donnée
   */

   sendOrDeleteChauffeur(data:Chauffeurs,method:string="post"):Observable<Chauffeurs>{

    if(method==="post"){
       
     
      return this.http.post<Chauffeurs>(this.urlChauffeurs,data,this.httpOptions);
    }
    else if(method==="put"){
      
     
      return this.http.put<Chauffeurs>(this.urlChauffeurs + `${data.id}/detail/`,data,this.httpOptions);
    }
    

    return this.http.delete<Chauffeurs>(this.urlChauffeurs + `${data.id}/detail/`,this.httpOptions);

  }
}
