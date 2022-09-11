import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AcceuilMissionList } from '../Imission';

@Component({
  selector: 'app-ordre-mission',
  templateUrl: './ordre-mission.component.html',
  styleUrls: ['./ordre-mission.component.css']
})
export class OrdreMissionComponent implements OnInit {
  @ViewChild("child1") firstChild: ElementRef = new ElementRef("");


  constructor(private element: ElementRef){}

  // ngAfterViewInit() {
  //   this.firstChild.nativeElement
  //   .setAttribute( 'style','color: white; background: red' );
  //  }

  ngOnInit(): void {

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

          #logo {
            text-align: center;
            margin-bottom: 10px;
          }

          #logo img {
            width: 90px;
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
            padding: 5px 20px;
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
            padding: 10px;
            text-align: right;
          }

          table td.service,
          table td  {
            vertical-align: top;
          }

          table td.unit,
          table td.qty,
          table td.total {
            font-size: 1.2em;
          }

          table td.grand {
            border-top: 1px solid #5D6975;;
          }

          #notices .notice {
            color: #5D6975;
            font-size: 1.2em;
          }

        footer {
          width: 92%;
          position: relative;
          bottom: 0;
        /*
          border-top: 1px solid #C1CED9; */
          padding: 8px 0;
          color:#5D6975;
          font-size: 25px;
          letter-spacing: 1px;
        }


          #notices:after, .notice{
            content: "";
            display: block;
            clear: both;
          }


          .kl-title>h1>span{
            font-weight: bolder;
            letter-spacing: -2px;
            word-spacing: 8px;
          }


          hr, #trajet{
            content:"";
            display:block;
            clear: both;
          }

          header{
            margin-bottom: -5px;
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


}
