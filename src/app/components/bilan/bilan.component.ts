import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bilan', 
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class BilanComponent implements OnInit {

  exercice2022 = [{
    "name" :"Depense",
    "value":15000000
  },
  {
    "name":"Recette",
    "value":25000000
  }
];

  data : any[] = [
    {
      id:1,
      nom : "OUEDRAOGO Karim",
      depense:780000,
      recette:1500000
    },
    {
      id:2,
      nom : "KIEMTORE Ousmane",
      depense:2500000,
      recette:15000000
    },
    {
      id:3,
      nom : "TRAORE Salif",
      depense:575000,
      recette:1300000
    },
    {
      id:4,
      nom : "TOURE Ahmed",
      depense:2000000,
      recette:1500000
    }
  ];

  typeMission = [
    {
      id:1,
      nom : "Approvisonnement",
      valeur:150000000,
      pourcentage:3
    },
    {
      id:2,
      nom : "Livraison",
      valeur:6600000000,
      pourcentage:97
    }

  ];

  displayedColumns: string[] = ['id','nom', 'depense', 'recette', 'rentabilite','pourcentage'];
  displayed1Columns: string[] = ['id','nom', 'valeur','pourcentage'];
  dataSource = this.data;
  filtreFormGroup! : FormGroup;

  defaultDate1 = new Date('01/01/2022');
  defaultDate2 =  new Date();

  driverAvailable : boolean = false;


  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.filtreFormGroup = this.formBuilder.group({
        chauffeur : this.formBuilder.control(''),
        date1 : this.formBuilder.control(this.defaultDate1),
        date2 : this.formBuilder.control(this.defaultDate2)
    })
  }

  getFormData(){

  }

  getTotal(){
    let result = 0;
    for(let d of this.data){
      result += (d.recette - d.depense);
    }

    return result;
  }

  filtreData(chauffeur="",date1=new Date("01/01/2022"),date2=new Date()){
    
  }

   export(){

  }

  print(){
    
  }

}
