import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BilanService {

  readonly urlBilan ="http://127.0.0.1:8000/exercices/stat/";
  httpOptions = {};
  public token:any;


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

  getBilan():Observable<any[]>{
   
    return this.http.get<any[]>(this.urlBilan,this.httpOptions);
  }


  bilanApi(url:string,exercice:number):Observable<any[]>{
   
    return this.http.get<any[]>(url + `${exercice}/detail`,this.httpOptions);
  }
}
