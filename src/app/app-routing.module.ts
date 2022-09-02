import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { DepenseMissionComponent } from './components/depense-mission/depense-mission.component';
import { ExerciceComponent } from './components/exercice/exercice.component';
import { MissionComponent } from './components/missions/mission.component';
import { ProgrammationComponent } from './components/programmation/programmation.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { BilanComponent } from './components/bilan/bilan.component';
import { BilanDepenseComponent } from './components/bilan-depense/bilan-depense.component';
import { BilanRecetteComponent } from './components/bilan-recette/bilan-recette.component';

const routes: Routes = [
  {path:'',component:AuthentificationComponent},
  {path:'acceuil',component:AuthentificationComponent},

  //exercices
{path:'liste-exercices',component:ExerciceComponent},

// Les missions

{path:'mission',component:MissionComponent,
children :[
  {path:'programmation',component:ProgrammationComponent},
  {path:'depense',component:DepenseMissionComponent}
]},

// Les maintenances

{path:'maintenance',component:MaintenanceComponent},

// Les bilans
{path:'bilan',component:BilanComponent,
children :[
  {path:'bilan-depense',component:BilanDepenseComponent},
  {path:'bilan-recette',component:BilanRecetteComponent}
]},

{
  path:'detail-exercices/:_id',component:ExerciceComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
