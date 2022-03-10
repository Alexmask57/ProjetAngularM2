import { Component, OnInit } from '@angular/core';
import {Tournoi} from "../../models/Tournoi";
import {TournamentServiceService} from "../../service/tournament-service.service";

@Component({
  selector: 'app-historique-tournois',
  templateUrl: './historique-tournois.component.html',
  styleUrls: ['./historique-tournois.component.scss']
})
export class HistoriqueTournoisComponent implements OnInit {

  loading: boolean = true;
  listTournoi: Tournoi[] = [];
  columnTournoi: string[] = ['id', 'date', 'etat', 'nbParticipants'];

  constructor(private readonly tournoiService: TournamentServiceService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.tournoiService.fetch().subscribe(list => {
      this.listTournoi= list || [];

      this.loading = false;
    });
  }

}
