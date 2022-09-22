import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExercices, IResults } from '../folderModels/modelGestEntreprise/exercice';

@Injectable({
  providedIn: 'root'
})
export class ExercicesService {
  httpOptions = {}
  public token:any;
  readonly endpointListCreate = "http://127.0.0.1:8000/exercices/";
  readonly endpointListCreateStat = "http://127.0.0.1:8000/exercices/stat/";

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem("token")
    console.log(this.token)
    this.httpOptions = {
       headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "WEND-PANGA " + this.token
        },) }
      }

  getListeExercices():Observable<IExercices>{
    this.httpOptions = {
      method:'GET',
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': "WEND-PANGA " + this.token
       },) }
    return this.http.get<IExercices>(this.endpointListCreate, this.httpOptions);
  }

  getExerciceStat():Observable<IExercices>{
    this.httpOptions = {
      method:'GET',
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': "WEND-PANGA " + this.token
       },) }
    return this.http.get<IExercices>(this.endpointListCreateStat, this.httpOptions);
  }

  putExercices(data:IResults):Observable<any[]>{
    this.httpOptions = {
      method : 'PUT',
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': "WEND-PANGA " + this.token
       },)} 
    return this.http.put<any[]>(this.endpointListCreate + `${data.id}/detail`,this.httpOptions);
  }

  deleteExercices(data:IResults):Observable<any[]>{
    this.httpOptions = {
      method : 'DELETE',
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': "WEND-PANGA " + this.token
       },)} 
    return this.http.delete<any[]>(this.endpointListCreate + `${data.id}/detail`,this.httpOptions);
  }


}
