import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from './services/authen.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private authService : AuthenService, 
              private router:Router,
              private snackBar : MatSnackBar){

  }

  /**
   * Opening snacbar method
   */

   openSnackbar(action:string){
    this.snackBar.open('Vous n\'\êtes pas connecté !!!',action,{
      verticalPosition:'bottom',
      horizontalPosition:'start',
      duration:5000
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const isLogged = this.authService.isAuthenticated()

    if(isLogged == false){
      this.openSnackbar('Echec');
      this.router.navigate(['accueil']);

    }
    return isLogged;
  }
  
}
