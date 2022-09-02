import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { MissionComponent } from './components/missions/mission.component';
import { ExerciceComponent } from './components/exercice/exercice.component';
import { DepenseMissionComponent } from './components/depense-mission/depense-mission.component';
import { ProgrammationComponent } from './components/programmation/programmation.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { BilanComponent } from './components/bilan/bilan.component';
import { BilanDepenseComponent } from './components/bilan-depense/bilan-depense.component';
import { BilanRecetteComponent } from './components/bilan-recette/bilan-recette.component';
import { ProgrammerDialogueComponent } from './components/programmer-dialogue/programmer-dialogue.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    MissionComponent,
    ExerciceComponent,
    DepenseMissionComponent,
    ProgrammationComponent,
    MaintenanceComponent,
    BilanComponent,
    BilanDepenseComponent,
    BilanRecetteComponent,
    ProgrammerDialogueComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
