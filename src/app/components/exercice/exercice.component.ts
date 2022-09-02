import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent implements OnInit {

  panelOpenState = false;

  constructor(
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  openPage(url:string){

    this.router.navigate([url])

  }

  openMaintenance(){

    this.router.navigate(['maintenance'])

  }

  openBilan(){

    this.router.navigate(['bilan'])

  }

}
