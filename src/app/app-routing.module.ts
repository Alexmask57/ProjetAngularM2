import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ListPersonnagesComponent} from "./list-personnages/list-personnages.component";
import {HistoriqueTournoisComponent} from "./historique-tournois/historique-tournois.component";
import {ListParticipantsComponent} from "./list-participants/list-participants.component";

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {path:'Home', component: HomeComponent},
  {path:'ListPersonnages', component: ListPersonnagesComponent},
  {path:'ListParticipants', component: ListParticipantsComponent},
  {path:'HistoriqueTournois', component: HistoriqueTournoisComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
