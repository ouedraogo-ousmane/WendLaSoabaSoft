import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ExerciceComponent } from './components/exercice/exercice.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';

import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ListeExerciceComponent } from './components/liste-exercice/liste-exercice.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BilanComponent } from './components/bilan/bilan.component';
import { MenuBilanComponent } from './components/menu-bilan/menu-bilan.component';
import { ListeMissionComponent } from './components/missions/liste-mission/liste-mission.component';
import { ProgrammerComponent } from './components/missions/programmer/programmer.component';
import { MissionsComponent } from './components/missions/missions.component';
import { OrdreMissionComponent } from './components/missions/ordre-mission/ordre-mission.component';

const routes: Routes = [
  {path:'',component:AuthentificationComponent},
  {path:'accueil',component:AuthentificationComponent},

    //exercices
  {path:'exercice',component:ExerciceComponent,
  children :[
    {path:'statistique',component:StatistiqueComponent},
    {path:'liste-exercices',component:ListeExerciceComponent},
    {path:'bilan',component:BilanComponent},
    {path:'account',component:SettingsComponent}
  ]},
  //{path:'statistique',component:StatistiqueComponent},


  // Les missions

  {path:'mission',component:MissionsComponent},
  {path:'ordre', component:OrdreMissionComponent},

  // Les maintenances

  {path:'maintenance',component:MaintenanceComponent},

  // Les bilans
  {path:'menu-bilan',component:MenuBilanComponent,
  children :[
    {path:'bilan',component:BilanComponent}
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
