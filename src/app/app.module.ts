import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ExerciceComponent } from './components/exercice/exercice.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { MaintenanceDialogueComponent } from './components/maintenance-dialogue/maintenance-dialogue.component';
import {  HttpClientModule } from '@angular/common/http';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ListeExerciceComponent } from './components/liste-exercice/liste-exercice.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BilanComponent } from './components/bilan/bilan.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MenuBilanComponent } from './components/menu-bilan/menu-bilan.component';
import { ListeMissionComponent } from './components/missions/liste-mission/liste-mission.component';
import { ProgrammerComponent } from './components/missions/programmer/programmer.component';
import { MissionsComponent } from './components/missions/missions.component';
import { OrdreMissionComponent } from './components/missions/ordre-mission/ordre-mission.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    MissionsComponent,
    OrdreMissionComponent,
    ExerciceComponent,
    MaintenanceComponent,
    BilanComponent,
    MaintenanceDialogueComponent,
    ListeMissionComponent, 
    StatistiqueComponent,
    ListeExerciceComponent,
    SettingsComponent,
    ProgrammerComponent,
    MenuBilanComponent,
    ProgrammerComponent
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    NgxChartsModule


   
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
