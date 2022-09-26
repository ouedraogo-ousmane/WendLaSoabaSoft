import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AcceuilMissionList } from '../Imission';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-ordre-mission',
  templateUrl: './ordre-mission.component.html',
  styleUrls: ['./ordre-mission.component.css']
})
export class OrdreMissionComponent implements OnInit, OnDestroy {
  @ViewChild("child1") firstChild: ElementRef = new ElementRef("");
  // ngAfterViewInit() {
  //   this.firstChild.nativeElement
  //   .setAttribute( 'style','color: white; background: red' );
  //  }

  private readonly urlTrajet ="http://127.0.0.1:8000/missions/trajetsList/";
  private readonly urlDepense ="http://127.0.0.1:8000/missions/depMissionName/";
  private readonly urlProduit ="http://127.0.0.1:8000/missions/produits/";
  private readonly urlChauffeur ="http://127.0.0.1:8000/missions/chauffeurs/";
  private readonly urlVehicule ="http://127.0.0.1:8000/missions/vehiculeParcs/";

  trajet ! :AcceuilMissionList["trajet"];
  vehicule! :AcceuilMissionList["vehicule"]
  chauffeur! :AcceuilMissionList["chauffeur"];
  listeDepense : AcceuilMissionList["depenses"] = [];
  listeProduit :AcceuilMissionList["produits"] = [];

  constructor(private element: ElementRef,private missionService : MissionService){}

  @Input('mission') mission_toPrint! : AcceuilMissionList;

  ngOnInit(): void {

    this.chauffeur = this.mission_toPrint.chauffeur;
    this.vehicule = this.mission_toPrint.vehicule;
    this.trajet  = this.mission_toPrint.trajet;
    this.listeDepense = this.mission_toPrint.depenses
    this.listeProduit = this.mission_toPrint.produits

    //this.getOrdredata();


  }

  print(): void {

    let printContents, popupWin;

    printContents = document.getElementById('print-section')?.innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin?.document.open();
    popupWin?.document.write(`

      <html>
        <head>
          <title></title>
          <style>
          //........Customized style.......
          .clearfix:after {
            content: "";
            display: table;
            clear: both;
          }

          a {
            color: #5D6975;
            text-decoration: underline;
          }

          body {
            position: relative;
            width: 21cm;
            height: 29.7cm;
            margin: 0 auto;
            color: #001028;
            background: #FFFFFF;
            font-family: Arial, sans-serif;
            font-size: 12px;
            font-family: Arial;
          }

          header {
            padding: 10px 0;
            margin-bottom: 50px;
          }


          h1 {
            text-align: center;
            margin: 0 0 20px 0;

          }

          #project {
            float: left;
          }

          #project span {
            color: #5D6975;
            text-align: right;
            width: 55px;
            margin-right: 20px;
            display: inline-block;
            font-size: 0.8em;
          }

          #company {
            float: right;
            text-align: right;
          }

          #project div,
          #company div {
            white-space: nowrap;
          }

          table {
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 20px;
          }

          table tr:nth-child(2n-1) td {
            background: #F5F5F5;
          }

          table th,
          table td {
            text-align: center;
          }

          table th {
            padding: 5px 5px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;
            font-weight: normal;
          }

          table .service,
          table   {
            text-align: left;
          }

          table td {
            text-align: right;
            padding:0;
            margin:0px;
          }

          table td.service,
          table td  {
            vertical-align: top;
          }

          table td.unit,
          table td.qty,
          table td.total {
            font-size: 1.1em;
          }

          table td.grand {
            border-top: 1px solid #5D6975;;
          }

          .kl-title>h1>span{
            font-weight: bolder;
            letter-spacing: -2px;
            word-spacing: 5px;
          }


          hr, #trajet{
            content:"";
            display:block;
            clear: both;
          }

          header{
            margin-bottom: -5px;
          }

          #trajet{
            border:2px solid black;  border-radius: 8px; width: 90%;
          }
          table{
            width: 98%
          }

          footer{
            position:fixed;
            bottom:0;
            width:100%;
          }

          table td.qty{
            text-align:left;
          }

          table td.dep{
            text-align:center;
          }
          .kl-main-div-print{
            border:2px solid black;
            border-radius: 8px;
            width:  90%;
          }

          #kl-div-only{
            margin-top: 20px; padding-left: 10px; width:87%; font-size:18px;
            display:flex; justify-content:space-between;
          }
          </style>
        </head>

        <body onload="window.print();window.close()">
            ${printContents}
        </body>
      </html>`
  );
  popupWin?.document.close();
}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
}
