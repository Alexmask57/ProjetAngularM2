import { Component, OnInit } from '@angular/core';
import {TournamentServiceService} from "../../service/tournament-service.service";
import {TournoiDetail} from "../../models/Tournoi";
import {ActivatedRoute} from "@angular/router";
import {Match} from "../../models/Match";
import {AjoutPopupComponent} from "../list-participants/ajout-popup/ajout-popup.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DetailCombatComponent} from "./combat/detail-combat/detail-combat.component";

@Component({
  selector: 'detail-tournoi',
  templateUrl: './detail-tournoi.component.html',
  styleUrls: ['./detail-tournoi.component.scss']
})
export class DetailTournoiComponent implements OnInit {

  loading:boolean = true;
  tournoi: TournoiDetail | undefined;
  private detailsMatchDialog: MatDialogRef<DetailCombatComponent> | any;
  dialogStatus = 'inactive';

  constructor(private readonly service:TournamentServiceService, private readonly route: ActivatedRoute, public dialog: MatDialog) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.route.data.subscribe(( tournoi: any) => {
      this.tournoi = tournoi.tournoi;
      this.loading = false;
    });
  }



  showDialog(match: Match) {
    this.dialogStatus = 'active';
    this.detailsMatchDialog = this.dialog.open(DetailCombatComponent, {
        width: '600px',
        data: match,
      }
    );

    this.detailsMatchDialog.afterClosed().subscribe((match: any) => {
      this.dialogStatus = 'inactive';
      if (match) {
        this.update(match);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if (this.detailsMatchDialog != undefined) {
      this.detailsMatchDialog.close();
    }
  }

  update(match: Match) {
    if (match?.winner)
      this.service.setWinner(match?.idTournoi, match?.winner).subscribe(res => { this.hideDialog(); });
  }

}
