import { Component, OnInit } from '@angular/core';
import {TournamentServiceService} from "../../service/tournament-service.service";
import {TournoiDetail} from "../../models/Tournoi";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'detail-tournoi',
  templateUrl: './detail-tournoi.component.html',
  styleUrls: ['./detail-tournoi.component.scss']
})
export class DetailTournoiComponent implements OnInit {

  tournoi: TournoiDetail | undefined;
  oui: string = "oui";

  constructor(private readonly service:TournamentServiceService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(( tournoi: any) => (this.tournoi = tournoi.tournoi));
    console.log(this.tournoi);
  }

}
