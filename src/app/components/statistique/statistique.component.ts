import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  title = "Browsers Market sale";
  type = "PieChart";
  data = [
    ['Firefox',45.0],
    ['IE',26.8],
    ['Chrome',12.8],
    ['Safari',8.5],
    ['Opera',6.2],
    ['Others',0.7]
  ];

  columnNames = ['Browser','Percentages'];
  options = {
    colors : ['#e0440e','#e6693e','#ec8f6e','#f3b49f','#f6c7b6'],
    is3D:true
  };
  width = 550;
  height = 400;

  public chart: any = {
    title:"Diagramme en barre",
    type:'bar',
    data:[
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
    ],

  };

  view : number[] = [800,400]; // La taille du diagramme (largeur,hauteur)
  exercice : any[] = []; // Les données à visualiser
  scheme : any = ["blue","red","green"]; // les couleurs du diagramme
  shemeType: string = "ordinal"; // Le type d'echelle des couleurs
  customColors :any = {};
  animation : boolean = true;  // activation de l'animation
  legend : boolean = true; // Activation de la visualisation de la legende
  legendTitle : string = "Titre du graphique"; 
  legendPosition : string = 'right'; // Positionnement de la legende
  xAxis : boolean = true; // Visualisation de l'axe X
  yAxis : boolean = true; // Visualisation de l'axe Y



  constructor() { 
   // Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.createChart();
  }

  
  
  

  createChart(){
    this.exercice = [
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
    ]
  /*
    this.chart = new Chart("Diagramme", {
      type: "bar", 

      data: {
        // values on X-Axis 
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13','2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	      datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92','574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17','0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
*/
  }

}
