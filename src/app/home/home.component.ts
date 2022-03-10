import { Component, OnInit } from '@angular/core';
import {SsbCharactersService} from "../../service/ssb-characters.service";
import {TournamentServiceService} from "../../service/tournament-service.service";
import {Tournoi} from "../../models/Tournoi";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AjoutTournoiComponent} from "./ajout-tournoi/ajout-tournoi.component";
import {Participant} from "../../models/Participant";
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Boite de dialogue pour l'ajout d'un tournoi
   * @private
   */
  private addDialog: MatDialogRef<AjoutTournoiComponent> | any;

  /**
   * Liste des tournois actifs
   */
  listOpen: Tournoi[] = [];

  /**
   * Colonnes du tableau d'affichage des tournois
   */
  columnTournoi: string[] = ['id', 'date', 'etat', 'nbParticipants'];

  /**
   * Status de la boite de dialogue
   */
  dialogStatus = 'inactive';

  constructor(private readonly tournoiService:TournamentServiceService, public dialog: MatDialog, private readonly router: Router) { }

  ngOnInit(): void {
    this.tournoiService.fetchOpen().subscribe(list => {
      this.listOpen = list || [];
    });
  }

  /**
   * Création d'un tournoi
   * @param participants Liste des participants au tournoi
   */
  add(participants: Participant[]) {
    this.tournoiService.create(participants).subscribe(tournoi => {
      this.listOpen.push(tournoi);
      this.hideAddDialog();
    });
  }

  /**
   * Affiche le dialogue d'ajout de tournoi
   */
  showAddDialog() {
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AjoutTournoiComponent, {
      width: '600px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe((participants: any) => {
      console.log(participants);
      this.dialogStatus = 'inactive';
      if(participants) {
        this.add(participants)
      }
    });
  }

  /**
   * Cache le dialogue d'ajout de tournoi
   */
  hideAddDialog() {
    this.dialogStatus = 'inactive';
    if (this.addDialog != undefined) {
      this.addDialog.close();
    }
  }

  displayDetailsTournoi(tournoi: Tournoi){
    this.router.navigate(['/detailsTournoi', tournoi?.id]).then(r => null);
  }

}
