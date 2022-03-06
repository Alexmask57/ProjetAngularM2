import { Component, OnInit } from '@angular/core';
import {Character, SsbCharactersService} from "../../service/ssb-characters.service";
import {TournamentServiceService} from "../../service/tournament-service.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list: Character[] = [];

  constructor(private readonly service:TournamentServiceService) { }

  ngOnInit(): void {
    this.service.fetchOne("1").subscribe(l => {
      //this.list = l || [];
      console.log(l);
    });
  }

}
