import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Iuser{
  username : String,
  password:String,
}


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  httpOptions = {}

  userLoginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  })

  invalid_Hint = false;
  constructor(
    private authService:AuthenService,
    private route:Router,
    private snackBar : MatSnackBar
    ){}

    ngOnInit() {
      this.logout()
    }

    // methode d'obtention du token (connexion)
    onLoginAction(userData: any) {

      const utilisateur = {
         'username': userData.username,
         'password': userData.password
        }

      this.authService.login(utilisateur);
      this.onConnected()
    }


    openSnackbar(action:string){
      this.snackBar.open('Vous êtes connecté',action,{
        verticalPosition:'bottom',
        horizontalPosition:'start',
        duration:5000
      });
    }

   // ralentie pour attendre la reponse du backend: (ameliorable avec un subscribe)
    onConnected(){
      setTimeout(()=>{
        if (this.authService.isAuthenticated()){
          this.userLoginForm.reset()
          //this.authService.refreshToken()
          this.route.navigate(['exercice']) // navigation
          this.openSnackbar('succès !!!')

        }else{
          this.invalid_Hint = true;
        }
      }, 1000)
    }

    // methodes de rafraichissement et de suppression (deconnexion) du token
    // refreshToken() {
    //   this.authService.refreshToken();
    // }

    logout() {
      this.authService.logout();
    }

    // necessaire pour tout attaque a la Bd
  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //    'Authorization': "WEND-PANGA" + this.authService.token
  //  })}

}
