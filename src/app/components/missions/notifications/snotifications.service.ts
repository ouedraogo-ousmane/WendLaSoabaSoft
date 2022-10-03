import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdocsVehicules, Inotifications } from './inotifications';

@Injectable({
  providedIn: 'root'
})
export class SnotificationsService {

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



deleteDocsVehicule(id:number):Observable<any>{
  const endpoint:string = "http://127.0.0.1:8000/missions/docsVehicules/"+id+"/detail/"
  return this.http.delete(endpoint, this.httpOptions)
};

updateDocsVehicule(data:any):Observable<IdocsVehicules>{
  const endpoint:string = "http://127.0.0.1:8000/missions/docsVehicules/"+data.id+"/detail/"
  return this.http.patch<IdocsVehicules>(endpoint, data, this.httpOptions)
};

getDocsVehicule():Observable<Inotifications>{
  const endpoint:string = "http://127.0.0.1:8000/missions/docsVehicules/"
  return this.http.get<Inotifications>(endpoint, this.httpOptions)
};


getPageUrlDocVehicules(page_url:string):Observable<Inotifications>{
  return this.http.get<Inotifications>(page_url, this.httpOptions)
}


}
