import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMission } from '../Imission';
import { IchauffeursVehicule, Iclients, Idepenses, Iproduits, Itrajets } from './iprogrammer';

@Injectable({
  providedIn: 'root'
})
export class ProgrammerService {
  private httpOptions = {}
  public token:any;

  readonly endPointAjoutMission="http://127.0.0.1:8000/missions/creer/";


  constructor(private http:HttpClient) {
    this.token = localStorage.getItem("token")
    this.httpOptions = {
       headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "WEND-PANGA " + this.token
        },) }
   }

   // GET Programmation data
  getListeIntituleTrajets():Observable<Itrajets[]>{
       const endpointTrajets ="http://127.0.0.1:8000/missions/trajetsList/";
        return this.http.get<Itrajets[]>(endpointTrajets,this.httpOptions)
  }

  getListeIntituleProduits():Observable<Iproduits[]>{
      const endpointProduits ="http://127.0.0.1:8000/missions/produits/";
      return this.http.get<Iproduits[]>(endpointProduits,this.httpOptions)
  }

  getListesChauffeurVehicules():Observable<IchauffeursVehicule[]>{
      const  endpointChauffeurVeh ="http://127.0.0.1:8000/missions/programmerVehicule/"
      return this.http.get<IchauffeursVehicule[]>(endpointChauffeurVeh,this.httpOptions)
  }

  getListeIntituleDepenses():Observable<Idepenses[]>{
      const endpointDepenses ="http://127.0.0.1:8000/missions/depMissionName/";
      return this.http.get<Idepenses[]>(endpointDepenses,this.httpOptions)
  }

 getListeClients():Observable<Iclients[]>{
    const endpointClients ="http://127.0.0.1:8000/missions/Clients/";
    return this.http.get<Iclients[]>(endpointClients,this.httpOptions);

 }

// POST Programmation Data

saveMission(data:IMission):Observable<IMission>{
  console.log(data);
  return this.http.post<IMission>(this.endPointAjoutMission, data, this.httpOptions)};
}
