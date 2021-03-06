import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerComponent } from './drawer/drawer.component';
import { HeaderComponent } from './header/header.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { HomeComponent } from './home/home.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatSliderModule} from '@angular/material/slider';
import { ListPersonnagesComponent } from './list-personnages/list-personnages.component';
import { CardPersonnageComponent } from './list-personnages/card-personnage/card-personnage.component';
import { HistoriqueTournoisComponent } from './historique-tournois/historique-tournois.component';
import { ListParticipantsComponent } from './list-participants/list-participants.component';
import { CardParticipantsComponent } from './list-participants/card-participants/card-participants.component';
import { DetailTournoiComponent } from './detail-tournoi/detail-tournoi.component';
import { CombatComponent } from './detail-tournoi/combat/combat.component';
import { AjoutPopupComponent } from './list-participants/ajout-popup/ajout-popup.component';
import { FormulaireComponent } from './partage/formulaire/formulaire.component';
import { EditionComponent } from './list-participants/edition/edition.component';
import { AjoutTournoiComponent } from './home/ajout-tournoi/ajout-tournoi.component';
import { FormulaireTournoiComponent } from './partage/formulaire-tournoi/formulaire-tournoi.component';
import { GraphStatsComponent } from './graph-stats/graph-stats.component';
import {NgxEchartsModule} from "ngx-echarts";
import {MatSelectModule} from "@angular/material/select";
import { DetailCombatComponent } from './detail-tournoi/combat/detail-combat/detail-combat.component';
import { LoadingComponent } from './loading/loading.component';
import { DialogComponent } from './partage/dialog/dialog.component';
import { RefreshComponent } from './partage/refresh/refresh.component';
import { MarioComponent } from './loading/mario/mario.component';
import { PacmanComponent } from './loading/pacman/pacman.component';
import { MarioFixComponent } from './partage/mario-fix/mario-fix.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    HeaderComponent,
    HomeComponent,
    ListPersonnagesComponent,
    CardPersonnageComponent,
    HistoriqueTournoisComponent,
    ListParticipantsComponent,
    CardParticipantsComponent,
    DetailTournoiComponent,
    CombatComponent,
    AjoutPopupComponent,
    FormulaireComponent,
    EditionComponent,
    AjoutTournoiComponent,
    FormulaireTournoiComponent,
    GraphStatsComponent,
    DetailCombatComponent,
    LoadingComponent,
    DialogComponent,
    RefreshComponent,
    MarioComponent,
    PacmanComponent,
    MarioFixComponent,
    AudioPlayerComponent
  ],
    imports: [
        HttpClientModule,
        MatSliderModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatTableModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        FormsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        MatSelectModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
