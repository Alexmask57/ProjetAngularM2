import { Component, OnInit } from '@angular/core';
import {Tournoi} from "../../models/Tournoi";
import {TournamentServiceService} from "../../service/tournament-service.service";

@Component({
  selector: 'app-historique-tournois',
  templateUrl: './historique-tournois.component.html',
  styleUrls: ['./historique-tournois.component.scss']
})
export class HistoriqueTournoisComponent implements OnInit {

  listTournoi: Tournoi[] = [];
  columnTournoi: string[] = ['id', 'date', 'etat', 'nbParticipants'];

  constructor(private readonly tournoiService: TournamentServiceService) { }

  ngOnInit(): void {
    this.tournoiService.fetch().subscribe(list => {
      this.listTournoi= list || [];
      console.log(list);
      console.log(this.listTournoi);
    });
  }

}
