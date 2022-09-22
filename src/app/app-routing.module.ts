import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ExerciceComponent } from './components/exercice/exercice.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';

import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ListeExerciceComponent } from './components/liste-exercice/liste-exercice.component';
import { BilanComponent } from './components/bilan/bilan.component';

import { MenuMissionComponent } from './components/menu-mission/menu-mission.component';
import { ProgrammerComponent } from './components/missions/programmer/programmer.component';
import { MissionsComponent } from './components/missions/missions.component';
import { OrdreMissionComponent } from './components/missions/ordre-mission/ordre-mission.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {path:'accueil',component:AuthentificationComponent},

    //exercices
  {path:'exercice',component:ListeExerciceComponent,
  children :[
    {path:'statistique',component:StatistiqueComponent},
    {path:'bilan',component:BilanComponent},
    
  ]},
  
  {path:'statistique',component:StatistiqueComponent},

  {path:'add',component:ProgrammerComponent},
  {path:'liste-mission',component:MissionsComponent},


  // Les missions

  {path:'mission',component:MissionsComponent,
    
  },
  {path:'ordre', component:OrdreMissionComponent},

  // Les maintenances

  {path:'maintenance',component:MaintenanceComponent},

  // Les bilans
  {path:'bilan',component:BilanComponent},

  {
    path:'detail-exercices/:_id',component:ExerciceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
