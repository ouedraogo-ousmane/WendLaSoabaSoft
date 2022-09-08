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
import { RecetteComponent } from './components/recette/recette.component';
import { ListeMissionComponent } from './components/liste-mission/liste-mission.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ListeExerciceComponent } from './components/liste-exercice/liste-exercice.component';

const routes: Routes = [
  {path:'',component:AuthentificationComponent},
  {path:'accueil',component:AuthentificationComponent},

  //exercices
{path:'exercice',component:ExerciceComponent,
children :[
 // {path:'statistique',component:StatistiqueComponent},
  {path:'liste-exercices',component:ListeExerciceComponent},
  {path:'compte',component:ListeMissionComponent}
]},
{path:'statistique',component:StatistiqueComponent},


// Les missions

{path:'mission',component:MissionComponent,
children :[
  {path:'programmation',component:ProgrammationComponent},
  {path:'liste-mission',component:ListeMissionComponent},
  {path:'recette',component:RecetteComponent}
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
