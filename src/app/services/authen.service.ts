import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Iuser } from '../components/authentification/authentification.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
   // http options
   private httpOptions: any;
   // the actual JWT token
   public token: String = '';
   // the token expiration date
   public token_expires: Date | any;
   // error messages received from the login attempt
   public errors: any = [];

   // url base for auth
   readonly endpointGet = "http://127.0.0.1:8000/api/token/"
   readonly endpointRefresh = "http://127.0.0.1:8000/api/token/refresh/"

   constructor(private http: HttpClient) {
    // Entete des requestes
     this.httpOptions = {
      method:"POST",
       headers: new HttpHeaders({
          'Content-Type': 'application/json',
        },)
     }

   }

   // http.post() d'obtention du token
   public login(user: Iuser) {
    const data = JSON.stringify(user)

    this.http.post(this.endpointGet, data ,this.httpOptions).
    subscribe(
        (value:any) =>{
          this.updateData(value['access']);
        },
        (err:any)=> {
          this.errors['error'] = err['error'];
           //console.log(this.errors)
        }
      );
   }

   // methode de rafraichissement du token
   public refreshToken() {
     // a modifier

     this.http.post(this.endpointRefresh, JSON.stringify({token: this.token}), this.httpOptions).
     subscribe(
          (data:any)=> {
              this.updateData(data['access']);
            },
          err => {
             this.errors = err['error'];
             console.log(this.errors)
         });
        }
// Suppression de la variable token
   public logout() {
     localStorage.removeItem('token')
     localStorage.removeItem('user_id')
     this.token = '';
     this.token_expires = null;
   }

   // mise a de la variable token
   private updateData(token: string) {

     this.token = token; // token obtenu si donnee valid
     localStorage.setItem('token',token)

     this.errors = [];
     // recuperer l'utilisateur connecter et la date d'expiration du token
     const token_parts = this.token.split(/\./);  // division du token en 02 parties: date et contenu
     const token_decoded = JSON.parse(window.atob(token_parts[1])); // decodage du la partie 1 en date
     this.token_expires = new Date(token_decoded.exp * 1000); // determination de la d'expi
    //  console.log(token_decoded)
     const user_id = token_decoded.user_id; // recuperation de l'id de l'utilisateur connecter

     localStorage.setItem("user_id",user_id )
   }

    // return l'etat de l'authentification
   isAuthenticated():boolean{
    if (localStorage.getItem('token') ) return true
    return false
   }

}
