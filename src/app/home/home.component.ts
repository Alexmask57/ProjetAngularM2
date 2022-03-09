import { Component, OnInit } from '@angular/core';
import {Character, SsbCharactersService} from "../../service/ssb-characters.service";
import {TournamentServiceService} from "../../service/tournament-service.service";
import {Tournoi} from "../../models/Tournoi";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AjoutTournoiComponent} from "./ajout-tournoi/ajout-tournoi.component";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private addDialog: MatDialogRef<AjoutTournoiComponent> | any;
  listOpen: Tournoi[] = [];
  columnTournoi: string[] = ['id', 'date', 'etat', 'nbParticipants'];
  dialogStatus = 'inactive';

  constructor(private readonly tournoiService:TournamentServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tournoiService.fetchOpen().subscribe(list => {
      this.listOpen = list || [];
    });
  }

  showDialog() {
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AjoutTournoiComponent, {
      width: '600px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe((tournoi: any) => {
      this.dialogStatus = 'inactive';
      if(tournoi) {
        console.log(tournoi);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if (this.addDialog != undefined) {
      this.addDialog.close();
    }
  }


}
