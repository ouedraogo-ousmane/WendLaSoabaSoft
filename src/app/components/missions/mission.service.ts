import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcceuilMissionList } from './Imission';

export interface IlisteMission {
  // format generale de retour des missions a l'acceuil
  count: number,
  next: string,
  previous: string,
  results: AcceuilMissionList[]
}

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private httpOptions = {}
  public token:any;

  private readonly endpointDelMission ="http://127.0.0.1:8000/missions/";

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem("token")
    this.httpOptions = {
       headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "WEND-PANGA " + this.token
        },) }
   }

  getListeMission(endpointListeMission:any):Observable<IlisteMission>{
    console.log(endpointListeMission)
    return this.http.get<IlisteMission>(
      endpointListeMission,
      this.httpOptions
      );}

  //http://127.0.0.1:8000/missions/1/detail/
  deleteMission(id:number):Observable<any>{
    return this.http.delete<any>(this.endpointDelMission+id+'/detail/', this.httpOptions)
  }

  endMission(data:AcceuilMissionList):Observable<any>{
    return this.http.patch<any>(this.endpointDelMission+data.id  + '/detail/',
                                data, this.httpOptions)
  }

  getData(url:string,id:number):Observable<any>{
    return this.http.get<any>(
      url + `${id}/detail`,
      this.httpOptions
      );}


}
