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
import { IsLoggedGuard } from './is-logged.guard';
import { ChauffeurComponent } from './components/chauffeur/chauffeur.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {path:'accueil',component:AuthentificationComponent},

    //exercices
  {
    path:'exercice',component:ListeExerciceComponent,
    canActivate:[IsLoggedGuard]
  },
  
  {
    path:'statistique',
    component:StatistiqueComponent,
    canActivate:[IsLoggedGuard]
  },
  // Les bilans
  {
    path:'bilan',
    component:BilanComponent,
    canActivate:[IsLoggedGuard]    
  },

  {path:'add',component:ProgrammerComponent},
  {path:'liste-mission',component:MissionsComponent},


  // Les missions

  {
    path:'mission',
    component:MissionsComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:'ordre', 
    component:OrdreMissionComponent,
    canActivate:[IsLoggedGuard]
  },

  // Les maintenances

  {
    path:'maintenance',
    component:MaintenanceComponent,
    canActivate:[IsLoggedGuard]
  },

  // Les bilans
  {
    path:'bilan',
    component:BilanComponent,
    canActivate:[IsLoggedGuard]
  },
    // Les chauffeurs
    {
      path:'chauffeur',
      component:ChauffeurComponent,
      canActivate:[IsLoggedGuard]
    }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
