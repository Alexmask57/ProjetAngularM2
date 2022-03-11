import { Component, OnInit } from '@angular/core';
import {TournamentServiceService} from "../../service/tournament-service.service";
import {TournoiDetail} from "../../models/Tournoi";
import {ActivatedRoute, Router} from "@angular/router";
import {Match} from "../../models/Match";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DetailCombatComponent} from "./combat/detail-combat/detail-combat.component";
import {DialogComponent} from "../partage/dialog/dialog.component";
import {Participant} from "../../models/Participant";
import {Alert} from "../../models/Alert";

@Component({
  selector: 'detail-tournoi',
  templateUrl: './detail-tournoi.component.html',
  styleUrls: ['./detail-tournoi.component.scss']
})
export class DetailTournoiComponent implements OnInit {

  loading:boolean = true;
  tournoi: TournoiDetail | undefined;
  private detailsMatchDialog: MatDialogRef<DetailCombatComponent> | any;
  private deleteDialog: MatDialogRef<DialogComponent> | any;
  dialogStatus = 'inactive';

  constructor(private readonly service:TournamentServiceService, private readonly route: ActivatedRoute, public dialog: MatDialog, private readonly router: Router) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.route.data.subscribe(( tournoi: any) => {
      this.tournoi = tournoi.tournoi;
      this.loading = false;
    });
  }



  showDialog(match: Match) {
    if (match.participant1?.id && match.participant2?.id){
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
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if (this.detailsMatchDialog != undefined) {
      this.detailsMatchDialog.close();
    }
  }

  update(match: Match) {
      this.service.setWinner(match?.id as string, match?.winner).subscribe(res => {
        this.service.setCharacters(match?.id as string, match?.personnage1?.nom as string, match?.personnage2?.nom as string).subscribe(res => {
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/detailsTournoi', this.tournoi?.id]);
          });
          this.hideDialog();
        });
      });
  }

  delete(){
    this.service.delete(this.tournoi?.id as string).subscribe(res => {
      this.hideDeleteDialog();
      this.router.navigate(['/Home']).then(r => null);
    });
  }

  showDeleteDialog() {
    this.dialogStatus = 'active';
    let data: Alert = { response: true, texte: "Souhaitez-vous vraiment supprimer ce tournoi ?"}
    this.deleteDialog = this.dialog.open(DialogComponent, {
        width: '600px',
        data: data,
      }
    );

    this.deleteDialog.afterClosed().subscribe((res: any) => {
      this.dialogStatus = 'inactive';
      if (res) {
        this.delete();
      }
    });
  }

  hideDeleteDialog() {
    this.dialogStatus = 'inactive';
    if (this.deleteDialog != undefined) {
      this.deleteDialog.close();
    }
  }

  checkWinner(): boolean {
    return this.tournoi?.combats[0].winner != '0';
  }

  winnerIsPlayer1(): boolean {
    return this.tournoi?.combats[0].winner == this.tournoi?.combats[0].participant1?.id;
  }

  getWinner(): Participant {
    if (this.winnerIsPlayer1())
      return this.tournoi?.combats[0]?.participant1 as Participant;
    return this.tournoi?.combats[0]?.participant2 as Participant;
  }

}
