import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMission } from '../Imission';
import { InfoPesee } from '../programmer/iprogrammer';


@Injectable({
  providedIn: 'root'
})
export class SdetailMissionService {
  private httpOptions = {}
  public token:any;

constructor(private http:HttpClient) {
    this.token = localStorage.getItem("token")
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "WEND-PANGA " + this.token
        },) }
}

// mise à jour de produit, mission & depense
updateMission(data:IMission):Observable<IMission>{
  const endPointUpdateMission:string = "http://127.0.0.1:8000/missions/"+data.id+"/detail/"
  return this.http.patch<IMission>(endPointUpdateMission, data, this.httpOptions)
};

updateListeProduits(data:any):Observable<any>{
  const endpoint:string = "http://127.0.0.1:8000/missions/recetteGlobale/"+data.id+"/detail/"
  return this.http.patch(endpoint, data, this.httpOptions)
};

deleteListeProduits(id:number):Observable<any>{
  // mise a jour multiple en une request a implementé
  const endpoint:string = "http://127.0.0.1:8000/missions/recetteGlobale/"+id+"/detail/"
  return this.http.delete(endpoint, this.httpOptions)
};

updateListeDepenses(data:any):Observable<any>{
  // mise a jour multiple en une request a implementé
  const endpoint:string = "http://127.0.0.1:8000/missions/depensesMissions/"+data.id+"/detail/"
  return this.http.patch(endpoint, data, this.httpOptions)
};

deleteListeDepenses(id:number):Observable<any>{
  // mise a jour multiple en une request a implementé
  const endpoint:string = "http://127.0.0.1:8000/missions/depensesMissions/"+id+"/detail/"
  return this.http.delete(endpoint, this.httpOptions)
};

// Information sur le pesage
saveInfoPesee(data:InfoPesee):Observable<InfoPesee>{
  const endpoint:string = "http://127.0.0.1:8000/missions/recettePesees/"
  return this.http.post<InfoPesee>(endpoint, data, this.httpOptions)
};

updateInfoPesee(data:InfoPesee):Observable<InfoPesee>{
  const endpoint:string = "http://127.0.0.1:8000/missions/recettePesees/"+data.id+"/detail/"
  return this.http.patch<InfoPesee>(endpoint, data, this.httpOptions)
};

deleteInfoPesee(id:number):Observable<InfoPesee>{
  const endpoint:string = "http://127.0.0.1:8000/missions/recettePesees/" +id+ "/detail/"
  return this.http.delete<InfoPesee>(endpoint, this.httpOptions)
}

getInfoPesee(id_mission:number):Observable<InfoPesee[]>{
  const endpoint:string = "http://127.0.0.1:8000/missions/recettePesees/?id_mission="+id_mission;
  console.log(endpoint)
  return this.http.get<InfoPesee[]>(endpoint, this.httpOptions)
};

saveSansPesee(data:{id_mission:number}):Observable<{id_mission:number}>{
  const endpoint:string = "http://127.0.0.1:8000/missions/recettePesees/"
  return this.http.delete<{id_mission:number}>(endpoint, this.httpOptions)
}

}
