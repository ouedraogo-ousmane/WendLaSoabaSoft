import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import * as moment from 'moment';
import { IdocsVehicules, Inotifications } from './inotifications';
import { SnotificationsService } from './snotifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;
  isDate_proche:boolean = true;
  isDate_tres_proche:boolean = false;
  is_data_there:boolean = true;

  listeDocuentvehicule:IdocsVehicules[]= [];

  pagination_avt_url:string = '';
  pagination_arr_url:string = '';

  formDate = this.fb.group({
    date_expiration:[new Date(), {validators:[Validators.required]}]

  })
  constructor(private notificationService:SnotificationsService,
              private fb:FormBuilder,
              ) {}

  ngOnInit(): void {
      this.getListeDocsVehicule();
  }


  // get liste des documents
      // (data)=>{},
      // (error)=>{ console.log(error)},
      // ()=>{}

getListeDocsVehicule(){
    let pagination_info:any = {};
    this.notificationService.getDocsVehicule().subscribe(
      (data)=>{
        this.listeDocuentvehicule = data.results;
        console.log(data.results)
        pagination_info.next = data.next;
        pagination_info.previous = data.previous;
      },
      (error)=>{
        console.log(error)
      },

      ()=>{
        this.is_data_there = false;
        this.setListeFormControls();

        // pagination set
        if(pagination_info.next != null) this.pagination_avt_url = pagination_info.next 
        else this.pagination_avt_url = ''
  
        if(pagination_info.previous != null) this.pagination_arr_url = pagination_info.next 
        else this.pagination_arr_url = '' 
      }
    )
}

getNextOrPreviousData(page_url:string){
  let pagination_info:any = {};

  this.notificationService.getPageUrlDocVehicules(page_url).subscribe(
    (data)=>{
      this.listeDocuentvehicule = data.results;
      pagination_info.next = data.next;
      pagination_info.previous = data.previous;
    },
    (error)=>{
      console.log(error)
    },

    ()=>{
      this.is_data_there = false;
      this.setListeFormControls();

        // pagination set
      if(pagination_info.next != null) this.pagination_avt_url = pagination_info.next 
      else this.pagination_avt_url = ''

      if(pagination_info.previous != null) this.pagination_arr_url = pagination_info.next 
      else this.pagination_arr_url = ''
    }
  )
}

// pagination
getPreviousData(){
  this.getNextOrPreviousData(this.pagination_arr_url);
}

getNextData(){
  this.getNextOrPreviousData(this.pagination_avt_url);
}
  // mise à jours de la date d'expiration
updateListeDocsVehicule(){
    const docsVehicules:any = {
      id: this.document_to_upd.id,
      intitule: this.document_to_upd.intitule,
      date_expiration:  moment(String( this.formDate.get('date_expiration')?.value)).format('YYYY-MM-DD'),
      vehicule: this.document_to_upd.vehicule,
    }

    // console.log(docsVehicules)
    this.notificationService.updateDocsVehicule(docsVehicules).subscribe(
      (data)=>{
          //console.log(data);
          this.getListeDocsVehicule();
      },
      (error)=>{
        console.log(error)
      },
      ()=>{}
    )
}
  // suppression du document
DeleteListeDocsVehicule(){
    const id:number = 0;
    this.notificationService.updateDocsVehicule(id).subscribe(
      (data)=>{

      },
      (error)=>{
        console.log(error)
      },
      ()=>{}
    )
}

is_nbre_moisFar(nbreMois:number):boolean{
  if(nbreMois<=1){
    this.isDate_proche = false
    return true
  }
  return false;
}

is_date_panel_expand:boolean[] = [];

setListeFormControls(){
  for(let i=0; i<this.listeDocuentvehicule.length; i++){
    this.is_date_panel_expand[i] = false;
  }
}

document_to_upd!:IdocsVehicules;

setForcontrol(i:number){
  this.is_date_panel_expand[i] = true;
  this.document_to_upd = this.listeDocuentvehicule[i];
}

delFormControl(i:number){
  this.is_date_panel_expand[i] = false;
  this.formDate.reset();
}

}
