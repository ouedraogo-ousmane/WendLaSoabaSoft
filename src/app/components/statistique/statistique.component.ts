import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExercicesService } from '../../services/exercice.service';
import { Subscription } from 'rxjs';
import { IResults } from '../../folderModels/modelGestEntreprise/exercice';

export interface Stat {
  name : string;
  series : [
    {
      name : string,
      value : number
    },
    {
      name : string,
      value : number
    }
  ];

}

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})


export class StatistiqueComponent implements OnInit,OnDestroy {

  listeStat! :Stat[];
  stat :Stat;


  

  

  exercice  = [
    {
      "name": "2020",
      "series": [
        {
          "name": "Depense",
          "value": 73000000
        },
        {
          "name": "Recette",
          "value": 89400000
        }
      ]
    },
  
    {
      "name": "2021",
      "series": [
        {
          "name": "Depense",
          "value": 78700000
        },
        {
          "name": "Recette",
          "value": 82700000
        }
      ]
    },
    {
      "name": "2022",
      "series": [
        {
          "name": "Depense",
          "value": 8560000
        },
        {
          "name": "Recette",
          "value": 12500000
        }
      ]
    }
  ];

  exercice2022 = [{
    "name" :"Depense",
    "value":15000000
  },
  {
    "name":"Recette",
    "value":25000000
  }
];

 
  columnNames = ['Browser','Percentages'];
  options = {
    colors : ['#e0440e','#e6693e','#ec8f6e','#f3b49f','#f6c7b6'],
    is3D:true
  };
  width = 550;
  height = 400;

  exerciceData = [
    { name: "Exercice 2022", value: 1500000 },
    { name: "Exercice 2021", value: 2500000 },
    { name: "Exercice 2020", value: 9020000 },
    { name: "Exercice 2019", value: 1000000 },
    { name: "Exercice 2018", value: 6000000 }
  ];

  view : number[] = [800,400]; // La taille du diagramme (largeur,hauteur)
   // Les données à visualiser
  scheme : any = ["#704FCA","#4B852C","#867A3D","#5B6FC8","#25706F"]; // les couleurs du diagramme
  schemename: string = "ordinal"; // Le name d'echelle des couleurs
  colorScheme :any = {domain:this.scheme};
  animations : boolean = true;  // activation de l'animation
  legend : boolean = true; // Activation de la visualisation de la legende
  legendTitle : string = "Titre du graphique"; 
  legendPosition : string = 'below'; // Positionnement de la legende
  xAxisLabel : string = "Exercice"; // Visualisation de l'axe X
  yAxisLabel : string = "Resultat"; // Visualisation de l'axe Y
  xAxis : boolean = true; // Visualisation de l'axe X
  yAxis : boolean = true; // Visualisation de l'axe Y
  gradient : boolean = false;
  showGridLines : boolean = true;
  showDataLabel : boolean = true;
  barPadding : number = 5;
  tooltipDisabled : boolean = false;
  roundEdges : boolean = false

  exerciceForm! : FormGroup;
  selected = 'Exercice 2022';

  exerciceSub! : Subscription;

  listeExercice :IResults[] = [];



  constructor(private formBuilder : FormBuilder,
              private serviceExercice : ExercicesService) { 
   // Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.exerciceForm = this.formBuilder.group({
      exercice : this.formBuilder.control('Exercice 2022')
    })

    this.getAllExercice();
  }

  export(){

  }

  print(){
    
  }


  getAllExercice(){
    this.exerciceSub = this.serviceExercice.getListeExercices().subscribe(
      (dataGetted:any)=>{
        this.listeExercice = dataGetted.results;

        for(let data of this.listeExercice){
          this.serviceExercice.getExerciceStat(data.id).subscribe(
            (donnee:any)=>{
              let result= donnee.results;
              this.stat.name= "Exercice " + result.annee;
              this.stat.series[0].name = "Depenses Totales";
              this.stat.series[0].value = result.totalDepenses;
              this.stat.series[1].name = "Recette Totales";
              this.stat.series[1].value = result.totalRecette;

              this.listeStat.push(this.stat);

              console.log(this.listeStat)

            }
          );

        }
        
        
        console.log(this.listeExercice);
      },
      (error)=>{
        console.log("Erreur detecté de type ",error);
      },
      ()=>{
        console.log("Données complétés");
      }
    )
  }

  
  
  

//   createChart(){
//     this.exercice = [
//       {
//         "name": "2020",
//         "series": [
//           {
//             "name": "Depense",
//             "value": 73000000
//           },
//           {
//             "name": "Recette",
//             "value": 89400000
//           }
//         ]
//       },
    
//       {
//         "name": "2021",
//         "series": [
//           {
//             "name": "Depense",
//             "value": 78700000
//           },
//           {
//             "name": "Recette",
//             "value": 82700000
//           }
//         ]
//       },
//       {
//         "name": "2022",
//         "series": [
//           {
//             "name": "Depense",
//             "value": 8560000
//           },
//           {
//             "name": "Recette",
//             "value": 12500000
//           }
//         ]
//       }
//     ]
//   /*
//     this.chart = new Chart("Diagramme", {
//       name: "bar", 

//       data: {
//         // values on X-Axis 
//         labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13','2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
// 	      datasets: [
//           {
//             label: "Sales",
//             data: ['467','576', '572', '79', '92','574', '573', '576'],
//             backgroundColor: 'blue'
//           },
//           {
//             label: "Profit",
//             data: ['542', '542', '536', '327', '17','0.00', '538', '541'],
//             backgroundColor: 'limegreen'
//           }  
//         ]
//       },
//       options: {
//         aspectRatio:2.5
//       }
      
//     });
// */
//   }

  ngOnDestroy(): void {
      this.exerciceSub.unsubscribe();
  }
}
