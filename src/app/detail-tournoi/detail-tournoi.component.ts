import { Component, OnInit } from '@angular/core';
import {TournamentServiceService} from "../../service/tournament-service.service";
import {TournoiDetail} from "../../models/Tournoi";

@Component({
  selector: 'app-detail-tournoi',
  templateUrl: './detail-tournoi.component.html',
  styleUrls: ['./detail-tournoi.component.scss']
})
export class DetailTournoiComponent implements OnInit {

  tournoi: TournoiDetail | undefined;
  oui: string = "oui";

  constructor(private readonly service:TournamentServiceService) { }

  ngOnInit(): void {
    this.service.fetchOne("1").subscribe(t => {
      this.tournoi = t || undefined;
      console.log(this.tournoi);
    });
  }

}
