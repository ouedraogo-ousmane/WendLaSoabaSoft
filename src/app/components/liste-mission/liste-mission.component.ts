import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorIntl, MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-liste-mission',
  templateUrl: './liste-mission.component.html',
  styleUrls: ['./liste-mission.component.css']
})
export class ListeMissionComponent implements OnInit {

  sub:Subscription = new Subscription();
  exercice_id!:number; // exercice parent à la mission

  //ajout
 typesOfShoes: string[] = ['ouedradrogo Amado', 'Karim Is', 'Ms  salif', 'Moccasins', 'Sneakers'];


 constructor(private route : ActivatedRoute) { }

 ngOnInit(): void {
   //ajout


   //good
  this.exercice_id = this.exercice_parent();
 }


 exercice_parent():number{
   // methode permettant de retourner l'exercice parent d'une mission
   let queryParam:any;

      this.route.queryParamMap  //Recuperation des parametres state d'url : ActivatedRoute
     .subscribe((params) => {
        queryParam = {...params }; // operateur de diffussion

      });
      return queryParam.params.exercice
 }

 ngOnDestroy() {
   this.sub.unsubscribe();
 }

}
