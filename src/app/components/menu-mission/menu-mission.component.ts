import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { IResults } from 'src/app/folderModels/modelGestEntreprise/exercice';

@Component({
  selector: 'app-menu-mission',
  templateUrl: './menu-mission.component.html',
  styleUrls: ['./menu-mission.component.css']
})
export class MenuMissionComponent implements OnInit {

  exercice_id! : number;

  constructor(private router: Router,private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.exercice_id = this.getId_exercice();

  }

  openPage(url:string){
 
    this.router.navigate([url],{queryParams : {'exercice':this.exercice_id}});

  }

  /**
 * Cette methode permet de recuperer de l'exercice concerné par la maintenance
 */

   getId_exercice():number{
    
    let queryParam:any;

       this.route.queryParamMap  //Recuperation des parametres state d'url : ActivatedRoute
      .subscribe((params) => {
         queryParam = {...params }; // operateur de diffussion

       });
       return queryParam.params.exercice
  }


}
